import { DocumentData } from '@angular/fire/firestore';

export interface NutritionNote extends DocumentData {
  readonly title: string;

  readonly nutrition: number[];
}
