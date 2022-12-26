import { Component, ChangeDetectionStrategy, Self } from '@angular/core';
import { combineLatest } from 'rxjs';
import { NutritionRouterEventService } from 'src/app/services/nutrition-router-event.service';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';
import { NutritionHeaderActionService } from './nutrition-header-action.service';

@Component({
  selector: 'app-nutrition-header-action',
  templateUrl: './nutrition-header-action.component.html',
  styleUrls: ['./nutrition-header-action.component.scss'],
  providers: [NutritionHeaderActionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderActionComponent {
  public readonly notePage = NutritionRoutersPages.NOTE;

  public action$ = combineLatest({
    note: this._routerEvent.handling(NutritionRoutersPages.NOTE),
    notes: this._routerEvent.handling(NutritionRoutersPages.NOTES),
  });

  public constructor(
    @Self() private readonly _nutrition: NutritionHeaderActionService,
    private readonly _routerEvent: NutritionRouterEventService
  ) {}

  public onSaveNote(): void {
    this._nutrition.saveNote();
  }

  public onCancel(): void {}
}
