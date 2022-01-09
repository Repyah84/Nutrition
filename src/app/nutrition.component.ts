import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nutrition-root',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionComponent {}
