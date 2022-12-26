import { Injectable } from '@angular/core';
import {
  combineLatest,
  map,
  mapTo,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { NutritionNutritionixActionService } from 'src/app/services/nutrition-nutritionix-action.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';

@Injectable()
export class NutritionCardPageService {
  public readonly invalidateState$ = new Subject<void>();

  private readonly _nutrition$ = new Subject<string>();

  public readonly _items$ = this._nutrition$.pipe(
    switchMap((name) => this._nutritionix.getItem(name)),
    startWith([]),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  private readonly _nutritionixItems$ =
    this._nutritionixState.nutritionNutritionixState$.pipe(
      map((nutritionixItemsState) => Object.values(nutritionixItemsState)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  private readonly _overlay$: Observable<boolean> = merge(
    this._items$.pipe(map((items) => items.length > 0)),
    this._nutritionixItems$.pipe(mapTo(false)),
    this.invalidateState$.pipe(mapTo(false))
  );

  public readonly nutritionComposition$ = combineLatest({
    items: this._items$,
    isOpen: this._overlay$,
    nutritionixItems: this._nutritionixItems$,
  });

  public constructor(
    private readonly _nutritionix: NutritionNutritionixActionService,
    private readonly _nutritionixState: NutritionNutritionixStateService
  ) {}

  public search(name: string): void {
    this._nutrition$.next(name);
  }

  public addNutritionixItem(itemName: string): void {
    this._nutritionixState.add({ count: 1, itemName });
  }

  public deleteNutritionixItem(itemName: string): void {
    this._nutritionixState.delete({ count: -1, itemName });
  }

  public excludeNutritionixItem(itemName: string): void {
    this._nutritionixState.exclude(itemName);
  }
}
