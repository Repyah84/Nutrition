import { ChangeDetectionStrategy, Component } from '@angular/core';
import { nutritionRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'header[nutrition-header]',
  templateUrl: './nutrition-header.component.html',
  styleUrls: ['./nutrition-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderComponent {
  public readonly routes = nutritionRoutes;
}
