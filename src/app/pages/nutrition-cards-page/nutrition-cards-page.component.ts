import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nutrition-cards-page',
  templateUrl: './nutrition-cards-page.component.html',
  styleUrls: ['./nutrition-cards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionCardsPageComponent {
  public readonly list$ = collectionData(collection(this._fireStore, 'notis'), {
    idField: 'id',
  }).pipe(
    traceUntilFirst('firestore'),
    tap((r) => {
      console.log(r);
    })
  );
  public constructor(private readonly _fireStore: Firestore) {}
}
