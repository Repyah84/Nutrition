import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, share, takeUntil, filter } from 'rxjs';
import { NutritionNoteDocumentSerializer } from '../models/nutrition-note-serializer';
import { NutritionNoteDocument } from '../types/nutrition-note-document.interface';
import { NutritionRoutersPages } from '../types/nutrition-routing-pages.enum';
import { NutritionFireStoreService } from './nutrition-fire-store.service';
import { NutritionRouterEventService } from './nutrition-router-event.service';

@Injectable({ providedIn: 'root' })
export class NutritionNotesCacheService {
  public readonly notesList$ = this._nutritionFireStore.getNotesList().pipe(
    map((documentList) =>
      documentList.map((document) =>
        new NutritionNoteDocumentSerializer(document).getNutritionNoteDocument()
      )
    ),
    share({
      connector: () => new ReplaySubject<NutritionNoteDocument[]>(1),
      resetOnRefCountZero: false,
      resetOnComplete: false,
    }),
    takeUntil(
      this._routerHandle
        .handling(NutritionRoutersPages.SING_IN)
        .pipe(filter((value) => value))
    )
  );

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService,
    private readonly _routerHandle: NutritionRouterEventService
  ) {}

  public getItem(id: string): Observable<NutritionNoteDocument | undefined> {
    return this.notesList$.pipe(
      map((items) => items.find(({ noteId }) => noteId === id))
    );
  }
}
