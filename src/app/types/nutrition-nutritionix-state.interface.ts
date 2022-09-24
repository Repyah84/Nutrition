import { NutritionNutritionixItem } from './nutrition-nutritionix-item.interface';

export interface NutritionixStateItem extends NutritionNutritionixItem {
  readonly count: number;
}

export interface NutritionNutritionixState {
  [key: string]: NutritionixStateItem;
}
