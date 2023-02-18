import { Inject, Injectable } from '@angular/core';
import {
  map,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { NUTRITION_DOCUMENT_DATA } from '../tokens/nutrition-document-data';
import { NutritionNutritionixItem } from '../types/nutrition-nutritionix-item.interface';
import { NutritionNutritionixState } from '../types/nutrition-nutritionix-state.interface';
import { NutritionNutritionixCacheService } from './nutrition-nutritionix-cache.service';

interface itemProperty {
  itemName: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixStateService {
  private readonly _nutritionixStateAction$ = new Subject<itemProperty>();

  public readonly nutritionNutritionixState$ = this._nutritionData.pipe(
    switchMap((nutrition) =>
      this._nutritionixStateAction$.pipe(
        switchMap((noteProperty) =>
          this._nutritionixCache
            .getItem(noteProperty.itemName)
            .pipe(
              map<
                NutritionNutritionixItem,
                [itemProperty, NutritionNutritionixItem]
              >((nutritionix) => [noteProperty, nutritionix])
            )
        ),
        scan<
          [itemProperty, NutritionNutritionixItem],
          NutritionNutritionixState
        >(
          (
            state,
            [
              { count },
              {
                food_name,
                nf_calories,
                nf_cholesterol,
                nf_protein,
                nf_saturated_fat,
                nf_sugars,
                photo,
              },
            ]
          ) => {
            if (count === 0) {
              delete state[food_name];

              return state;
            }

            const stateItemCont =
              state[food_name] === undefined
                ? count
                : state[food_name].count + count;

            return {
              ...state,
              [food_name]: {
                count: stateItemCont,
                food_name,
                nf_calories: nf_calories * stateItemCont,
                nf_cholesterol: nf_cholesterol * stateItemCont,
                nf_protein: nf_protein * stateItemCont,
                nf_saturated_fat: nf_saturated_fat * stateItemCont,
                nf_sugars: nf_sugars * stateItemCont,
                photo,
              },
            };
          },
          nutrition
        ),
        startWith(nutrition)
      )
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  public constructor(
    @Inject(NUTRITION_DOCUMENT_DATA)
    private readonly _nutritionData: Observable<NutritionNutritionixState>,
    private readonly _nutritionixCache: NutritionNutritionixCacheService
  ) {}

  public increase(item: itemProperty): void {
    this._nutritionixStateAction$.next(item);
  }

  public decrease(item: itemProperty): void {
    this._nutritionixStateAction$.next(item);
  }

  public delete(item: itemProperty): void {
    this._nutritionixStateAction$.next(item);
  }
}
