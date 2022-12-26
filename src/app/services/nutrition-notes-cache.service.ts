import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, share, tap } from 'rxjs';
import { NutritionNoteDocumentSerializer } from '../models/nutrition-note-serializer';
import { NutritionNoteDocument } from '../types/nutrition-note-document.interface';
import { NutritionFireStoreService } from './nutrition-fire-store.service';

@Injectable({ providedIn: 'root' })
export class NutritionNotesCacheService {
  public readonly notesList$ = this._nutritionFireStore.getNotesList().pipe(
    map((documentList) =>
      documentList.map(
        (document) =>
          new NutritionNoteDocumentSerializer(document).nutritionNoteDocument
      )
    ),
    share({
      connector: () => new ReplaySubject<NutritionNoteDocument[]>(1),
      resetOnRefCountZero: false,
      resetOnComplete: false,
    })
  );

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService
  ) {}

  public getItem(id: string): Observable<NutritionNoteDocument | undefined> {
    return this.notesList$.pipe(
      map((items) => items.find(({ noteId }) => noteId === id))
    );
  }
}
