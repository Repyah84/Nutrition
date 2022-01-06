import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'header[nutrition-header]',
  templateUrl: './nutrition-header.component.html',
  styleUrls: ['./nutrition-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderComponent {}
