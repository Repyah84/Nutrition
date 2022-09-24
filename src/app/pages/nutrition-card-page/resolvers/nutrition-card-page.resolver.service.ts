import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { first, map, Observable, of } from 'rxjs';
import { NutritionNotesCacheService } from 'src/app/services/nutrition-notes-cache.service';
import { NutritionNutritionixStateService } from 'src/app/services/nutrition-nutritionix-state.service';
import { NutritionNoteDocument } from 'src/app/types/nutrition-note-document.interface';

@Injectable({ providedIn: 'root' })
export class NutritionCardPageResolverService
  implements Resolve<NutritionNoteDocument | null>
{
  public constructor(
    private readonly _notes: NutritionNotesCacheService,
    private readonly _nutritionixState: NutritionNutritionixStateService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<NutritionNoteDocument | null> | null {
    const id = route.queryParamMap.get('noteId');

    return id === null
      ? null
      : this._notes.notesList$.pipe(
          map((notesList) => {
            const notes = notesList.find(({ noteId }) => noteId === id);

            if (notes === undefined) {
              return null;
            }

            this._nutritionixState.value = notes.nutrition;

            return notes;
          }),
          first()
        );
  }
}
