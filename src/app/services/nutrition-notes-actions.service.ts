import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NutritionNoteDocument } from '../types/nutrition-note-document.interface';
import { NutritionNote } from '../types/nutrition-note.interface';
import { NutritionFireStoreService } from './nutrition-fire-store.service';

@Injectable()
export class NutritionNotesActionService implements OnDestroy {
  private readonly _subscription = new Subscription();

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService
  ) {}

  public add(note: NutritionNote): void {
    this._subscription.add(
      this._nutritionFireStore.addNutritionDocument(note).subscribe()
    );
  }

  public delete(noteId: string): void {
    this._subscription.add(
      this._nutritionFireStore.deleteNutritionDocument(noteId).subscribe()
    );
  }

  public update(note: NutritionNoteDocument): void {
    this._subscription.add(
      this._nutritionFireStore.updateNutritionDocument(note).subscribe()
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
