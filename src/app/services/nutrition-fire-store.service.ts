import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';

import { User } from 'firebase/auth';

import {
  filter,
  from,
  Observable,
  switchMap,
  map,
  first,
  OperatorFunction,
  pipe,
} from 'rxjs';
import { NutritionAuthService } from '../auth/nutrition-auth.service';
import { NutritionNote } from '../types/nutrition-note.interface';

function authMetadataDoc<T>(
  fn: (userId: string) => Observable<T>
): OperatorFunction<User, T> {
  return pipe(
    map(({ uid }) => uid),
    switchMap(fn)
  );
}

@Injectable({ providedIn: 'root' })
export class NutritionFireStoreService {
  public constructor(
    private readonly _fireStore: Firestore,
    private readonly _auth: NutritionAuthService
  ) {}

  public getNotesList(): Observable<DocumentData[]> {
    return this._nutritionMetadata((userId: string) =>
      collectionData(collection(this._fireStore, `nutrition/${userId}/notes`), {
        idField: 'noteId',
      }).pipe(traceUntilFirst('fireStore'))
    );
  }

  public getNutritionDocument(noteId: string): Observable<DocumentData> {
    return this._nutritionMetadata((userId: string) =>
      docData(doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`), {
        idField: 'noteId',
      })
    );
  }

  public deleteNutritionDocument(noteId: string): Observable<void> {
    return this._nutritionMetadataOnce((userId) =>
      from(
        deleteDoc(doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`))
      )
    );
  }

  public addNutritionDocument(note: NutritionNote): Observable<unknown> {
    return this._nutritionMetadataOnce((userId) =>
      from(
        addDoc(collection(this._fireStore, `nutrition/${userId}/notes`), note)
      )
    );
  }

  public updateNutritionDocument(
    noteId: string,
    note: NutritionNote
  ): Observable<void> {
    return this._nutritionMetadataOnce((userId) =>
      from(
        updateDoc(
          doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`),
          note
        )
      )
    );
  }

  private _nutritionMetadata<T>(
    fn: (userId: string) => Observable<T>
  ): Observable<T> {
    return this._auth.user$.pipe(
      filter((user): user is User => user !== null),
      authMetadataDoc(fn)
    );
  }

  private _nutritionMetadataOnce<T>(
    fn: (userId: string) => Observable<T>
  ): Observable<T> {
    return this._auth.user$.pipe(
      first((user): user is User => user !== null),
      authMetadataDoc(fn)
    );
  }
}
