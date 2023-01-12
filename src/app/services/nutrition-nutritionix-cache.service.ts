import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { NutritionNutritionixItem } from '../types/nutrition-nutritionix-item.interface';
import { NutritionNutritionixActionService } from './nutrition-nutritionix-action.service';

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixCacheService {
  private readonly _cache = new Map<
    string,
    Observable<NutritionNutritionixItem>
  >();

  public constructor(
    private readonly _nutritionix: NutritionNutritionixActionService
  ) {}

  public getItem(key: string): Observable<NutritionNutritionixItem> {
    let nutritionixItem = this._cache.get(key);

    if (nutritionixItem === undefined) {
      nutritionixItem = this._nutritionix
        .getNutrients(key)
        .pipe(shareReplay(1));

      this._cache.set(key, nutritionixItem);
    }

    return nutritionixItem;
  }
}
