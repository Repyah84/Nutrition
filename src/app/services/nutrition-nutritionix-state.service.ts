import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  defer,
  filter,
  first,
  map,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { NutritionNutritionixItem } from '../types/nutrition-nutritionix-item.interface';
import { NutritionNutritionixState } from '../types/nutrition-nutritionix-state.interface';
import { NutritionRoutersPages } from '../types/nutrition-routing-pages.enum';
import { NutritionNotesCacheService } from './nutrition-notes-cache.service';
import { NutritionNutritionixCacheService } from './nutrition-nutritionix-cache.service';
import { NutritionRouterEventService } from './nutrition-router-event.service';

interface itemProperty {
  itemName: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class NutritionNutritionixStateService {
  private readonly _nutritionixStateAction$ = new Subject<itemProperty>();

  public readonly nutritionNutritionixState$ = this._routeHandling
    .handling(NutritionRoutersPages.NOTE)
    .pipe(
      filter((value) => value),
      switchMap(() =>
        defer(() =>
          this._nutritionNotesCache
            .getItem(
              this._route.snapshot.queryParamMap.get('noteId') ?? 'notNoteId'
            )
            .pipe(
              map((nutritionDocument) =>
                nutritionDocument === undefined
                  ? ({} as NutritionNutritionixState)
                  : nutritionDocument.nutrition
              ),
              first()
            )
        )
      ),
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
    private readonly _nutritionixCache: NutritionNutritionixCacheService,
    private readonly _nutritionNotesCache: NutritionNotesCacheService,
    private readonly _routeHandling: NutritionRouterEventService,
    private readonly _route: ActivatedRoute
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
