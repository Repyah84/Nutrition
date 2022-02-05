import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { emergenceAnimation } from 'src/app/animation/nutrition-emergence.animation';
import { NutritionNotesActionService } from 'src/app/services/nutrition-notes-actions.service';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.emun';
@Component({
  selector: 'header[nutrition-header]',
  templateUrl: './nutrition-header.component.html',
  styleUrls: ['./nutrition-header.component.scss'],
  providers: [NutritionNotesActionService],
  animations: [emergenceAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderComponent {
  public readonly profilePage = NutritionRoutersPages.PROFILE;
  public readonly singInPage = NutritionRoutersPages.SING_IN;
  public readonly notesPage = NutritionRoutersPages.NOTES;

  public isOpen = false;

  public constructor(
    @Self() private readonly _nutrition: NutritionNotesActionService
  ) {}

  public onAddNote(): void {
    this._nutrition.add({
      title: 'First',
      nutrition: [],
    });
  }
}
