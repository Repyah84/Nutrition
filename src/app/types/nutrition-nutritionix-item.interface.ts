import { NutritionNutritionixPhoto } from './nutrition-nutritionix-photo.interface';

export interface NutritionNutritionixItem {
  readonly food_name: string;
  readonly nf_calories: number;
  readonly nf_cholesterol: number;
  readonly nf_protein: number;
  readonly nf_saturated_fat: number;
  readonly nf_sugars: number;
  readonly photo: NutritionNutritionixPhoto;
}
