import { NutritionNutritionixPhoto } from './nutrition-nutritionix-photo.interface';

export interface NutritionNutritionixCommon {
  readonly common_type: unknown;
  readonly food_name: string;
  readonly locale: string;
  readonly photo: NutritionNutritionixPhoto;
  readonly serving_qty: number;
  readonly serving_unit: string;
  readonly tag_id: string;
  readonly tag_name: string;
}
