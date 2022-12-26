import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, Subject, Subscription, switchMap, withLatestFrom } from 'rxjs';
import { NutritionFireStoreService } from 'src/app/services/nutrition-fire-store.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';

@Injectable()
export class NutritionHeaderActionService implements OnDestroy {
  private readonly _subscription = new Subscription();

  private readonly _saveClick$ = new Subject<void>();

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService,
    private readonly _nutrientsState: NutritionNutritionixStateService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    this._subscription.add(
      this._saveClick$
        .pipe(
          withLatestFrom(this._nutrientsState.nutritionNutritionixState$),
          switchMap(([_, nutrition]) =>
            defer(() => {
              const noteId = this._route.snapshot.queryParamMap.get('noteId');

              const date = Date.now();

              const nutritionNote = {
                date,
                nutrition,
              };

              if (noteId === null) {
                return this._nutritionFireStore.addNutritionDocument(
                  nutritionNote
                );
              }

              return this._nutritionFireStore.updateNutritionDocument(
                noteId,
                nutritionNote
              );
            })
          )
        )
        .subscribe(() => {
          void this._router.navigate([NutritionRoutersPages.NOTES]);
        })
    );
  }

  public saveNote(): void {
    this._saveClick$.next();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
