import { NutritionFirebaseConfig } from 'src/app/types/nutrition-firebase-config.intrface';
import { NutritionNutritionix } from './nutrition-nutritionix.interface';

export interface NutritionEnvironment {
  readonly production: boolean;
  readonly firebase: NutritionFirebaseConfig;
  readonly nutritionix: NutritionNutritionix;
}
