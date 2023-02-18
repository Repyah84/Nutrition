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
} from 'rxjs';
import { NutritionNutritionixActionService } from 'src/app/services/nutrition-nutritionix-action.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';

@Injectable()
export class NutritionCardPageService {
  private readonly _invalidateState$ = new Subject<void>();

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
    this._invalidateState$.pipe(mapTo(false))
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

  public increaseItem(itemName: string): void {
    this._nutritionixState.increase({ count: 1, itemName });
  }

  public decreaseItem(itemName: string): void {
    this._nutritionixState.decrease({ count: -1, itemName });
  }

  public deleteItem(itemName: string): void {
    this._nutritionixState.delete({ count: 0, itemName });
  }

  public invalidateState(): void {
    this._invalidateState$.next();
  }
}
