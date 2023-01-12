import { ChangeDetectionStrategy, Component } from '@angular/core';
import { emergenceAnimation } from 'src/app/animation/nutrition-emergence.animation';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';
@Component({
  selector: 'header[nutrition-header]',
  templateUrl: './nutrition-header.component.html',
  styleUrls: ['./nutrition-header.component.scss'],
  animations: [emergenceAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderComponent {
  public readonly profilePage = NutritionRoutersPages.PROFILE;
  public readonly singInPage = NutritionRoutersPages.SING_IN;
  public readonly notesPage = NutritionRoutersPages.NOTES;

  public isOpen = false;
}
