import { DocumentData } from '@angular/fire/firestore';
import { NutritionNutritionixState } from './nutrition-nutritionix-state.interface';

export interface NutritionNote extends DocumentData {
  readonly date: number;
  readonly nutrition: NutritionNutritionixState;
}
