import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { NutritionixStateItem } from 'src/app/types/nutrition-nutritionix-state.interface';
import { NutritionCardPageService } from '../../nutrition-card-page.service';

@Component({
  selector: 'app-nutrition-nutritionix-item',
  templateUrl: './nutrition-nutritionix-item.component.html',
  styleUrls: ['./nutrition-nutritionix-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionNutritionixItemComponent {
  @Input() public nutritionixItem!: NutritionixStateItem;

  public constructor(private readonly _nutritionix: NutritionCardPageService) {}

  public onIncrease(itemName: string): void {
    this._nutritionix.increaseItem(itemName);
  }

  public onDecrease(itemName: string): void {
    this._nutritionix.decreaseItem(itemName);
  }

  public onDelete(itemName: string): void {
    this._nutritionix.deleteItem(itemName);
  }
}
