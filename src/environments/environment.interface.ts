import { NutritionFirebaseConfig } from 'src/app/types/nutrition-firebase-config.interface';
import { NutritionNutritionix } from '../app/types/nutrition-nutritionix.interface';

export interface Environment {
  readonly production: boolean;
  readonly firebase: NutritionFirebaseConfig;
  readonly nutritionix: NutritionNutritionix;
}
