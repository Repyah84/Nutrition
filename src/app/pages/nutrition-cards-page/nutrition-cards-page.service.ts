import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NutritionFireStoreService } from 'src/app/services/nutrition-fire-store.service';

@Injectable()
export class NutritionCardsPageService implements OnDestroy {
  private readonly _subscription = new Subscription();

  public constructor(
    private readonly _nutritionFireStore: NutritionFireStoreService
  ) {}

  public delete(noteId: string): void {
    this._subscription.add(
      this._nutritionFireStore.deleteNutritionDocument(noteId).subscribe()
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
