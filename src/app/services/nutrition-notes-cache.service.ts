import { Injectable } from '@angular/core';
import { map, ReplaySubject, share } from 'rxjs';
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
    })
  );

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService
  ) {}
}
