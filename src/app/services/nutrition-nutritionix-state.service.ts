import { Injectable } from '@angular/core';
import {
  defer,
  finalize,
  map,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { NutritionNutritionixItem } from '../types/nutrition-nutritionix-item.interface';
import { NutritionNutritionixState } from '../types/nutrition-nutritionix-state.interface';
import { NutritionNutritionixCacheService } from './nutrition-nutritionix-cache.service';

interface itemProperty {
  itemName: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixStateService {
  private _value: NutritionNutritionixState = {};

  public set value(state: NutritionNutritionixState) {
    this._value = state;
  }

  public get value(): NutritionNutritionixState {
    return this._value;
  }

  private readonly _nutritionixStateAction$ = new Subject<itemProperty>();

  public readonly nutritionNutritionixState$ = defer(() =>
    this._nutritionixStateAction$.pipe(
      finalize(() => (this.value = {})),
      switchMap(({ itemName, count }) =>
        this._nutritionixCache
          .getItem(itemName)
          .pipe(
            map<NutritionNutritionixItem, [NutritionNutritionixItem, number]>(
              (nutritionixItem) => [nutritionixItem, count]
            )
          )
      ),
      scan<[NutritionNutritionixItem, number], NutritionNutritionixState>(
        (
          state,
          [
            {
              food_name,
              nf_calories,
              nf_cholesterol,
              nf_protein,
              nf_saturated_fat,
              nf_sugars,
              photo,
            },
            count,
          ]
        ) => {
          if (state[food_name] === undefined) {
            return {
              ...state,
              [food_name]: {
                count,
                food_name,
                nf_calories,
                nf_cholesterol,
                nf_protein,
                nf_saturated_fat,
                nf_sugars,
                photo,
              },
            };
          }

          const stateItemCont = state[food_name].count + count;

          if (count === 0 || stateItemCont < 1) {
            delete state[food_name];

            return state;
          }

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

        this._value
      ),
      tap((state) => {
        this.value = state;
      }),
      startWith(this._value),
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  );

  public constructor(
    private readonly _nutritionixCache: NutritionNutritionixCacheService
  ) {}

  public add(item: itemProperty): void {
    this._nutritionixStateAction$.next(item);
  }

  public delete(item: itemProperty): void {
    this._nutritionixStateAction$.next(item);
  }

  public exclude(itemName: string): void {
    this._nutritionixStateAction$.next({ count: 0, itemName });
  }
}
