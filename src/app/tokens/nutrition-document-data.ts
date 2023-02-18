import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NutritionNutritionixState } from '../types/nutrition-nutritionix-state.interface';

export const NUTRITION_DOCUMENT_DATA = new InjectionToken<
  Observable<NutritionNutritionixState>
>('NUTRITION_DOCUMENT_DATA');
