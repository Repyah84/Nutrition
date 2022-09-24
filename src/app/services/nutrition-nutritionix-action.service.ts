import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { NutritionNutritionixCommon } from '../types/nutrition-nutritionix-common.interface';
import { NutritionNutritionixItem } from '../types/nutrition-nutritionix-item.interface';
import { NutritionNutritionixService } from './nutrition-nutritionix-api-service';

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixActionService {
  public constructor(
    private readonly _nutritionix: NutritionNutritionixService
  ) {}

  public getItem(foodName: string): Observable<NutritionNutritionixCommon[]> {
    return this._nutritionix
      .getIteByName(foodName)
      .pipe(map(({ common }) => common));
  }

  public getNutrients(name: string): Observable<NutritionNutritionixItem> {
    return this._nutritionix.getItemNutrients(name).pipe(
      map(({ foods }) => foods.find(({ food_name }) => food_name === name)),
      filter((item): item is NutritionNutritionixItem => item !== undefined)
    );
  }
}
