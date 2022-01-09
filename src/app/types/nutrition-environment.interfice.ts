import { NutritionFirebaseConfig } from 'src/app/types/nutrition-firebase-config.intrface';

export interface NutritionEnvironment {
  readonly production: boolean;
  readonly firebase: NutritionFirebaseConfig;
}
