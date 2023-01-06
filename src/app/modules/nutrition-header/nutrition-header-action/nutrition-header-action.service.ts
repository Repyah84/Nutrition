import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  defer,
  Subject,
  Subscription,
  switchMap,
  withLatestFrom,
  first,
} from 'rxjs';
import { NutritionFireStoreService } from 'src/app/services/nutrition-fire-store.service';
import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';
import { NutritionNoteDocument } from 'src/app/types/nutrition-note-document.interface';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';

@Injectable()
export class NutritionHeaderActionService implements OnDestroy {
  private readonly _subscription = new Subscription();

  private readonly _saveClick$ = new Subject<void>();

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService,
    private readonly _nutrientsState: NutritionNutritionixStateService,
    private readonly _nutritionNotesCache: NutritionNotesCacheService,
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
              if (noteId === null) {
                return this._nutritionFireStore.addNutritionDocument({
                  date: Date.now(),
                  nutrition,
                });
              }
              return this._nutritionNotesCache.getItem(noteId).pipe(
                first(
                  (noteDocument): noteDocument is NutritionNoteDocument =>
                    noteDocument !== undefined
                ),
                switchMap((noteDocument) =>
                  this._nutritionFireStore.updateNutritionDocument(noteId, {
                    date: noteDocument.date,
                    nutrition,
                  })
                )
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

  public cancel(): void {
    void this._router.navigate([NutritionRoutersPages.NOTES]);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
