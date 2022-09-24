import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NutritionNotesActionService } from 'src/app/services/nutrition-notes-actions.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';
import { NutritionRouterEventService } from 'src/app/services/nutrition-router-event.service';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';

@Component({
  selector: 'app-nutrition-header-action',
  templateUrl: './nutrition-header-action.component.html',
  styleUrls: ['./nutrition-header-action.component.scss'],
  providers: [NutritionNotesActionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderActionComponent {
  public readonly notePage = NutritionRoutersPages.NOTE;

  public action$ = combineLatest({
    note: this._routerEvent.handling(NutritionRoutersPages.NOTE),
    notes: this._routerEvent.handling(NutritionRoutersPages.NOTES),
  });

  public constructor(
    @Self() private readonly _nutrition: NutritionNotesActionService,
    private readonly _routerEvent: NutritionRouterEventService,
    private readonly _nutrientsState: NutritionNutritionixStateService,
    private readonly _router: Router
  ) {}

  public onSaveNote(): void {
    this._nutrition.add({
      date: Date.now(),
      nutrition: this._nutrientsState.value,
    });

    void this._router.navigate([NutritionRoutersPages.NOTES]);
  }

  public onCancel(): void {}
}
