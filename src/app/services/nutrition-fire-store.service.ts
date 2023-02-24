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
  Observable,
  switchMap,
  map,
  first,
  OperatorFunction,
} from 'rxjs';
import { NutritionAuthService } from '../auth/nutrition-auth.service';
import { NutritionNote } from '../types/nutrition-note.interface';

function takeOnce(): OperatorFunction<User | null, User> {
  return first((user): user is User => user !== null);
}

@Injectable({ providedIn: 'root' })
export class NutritionFireStoreService {
  public constructor(
    private readonly _fireStore: Firestore,
    private readonly _auth: NutritionAuthService
  ) {}

  public getNotesList(): Observable<DocumentData[]> {
    return this._nutritionDocumentData((userId: string) =>
      collectionData(collection(this._fireStore, `nutrition/${userId}/notes`), {
        idField: 'noteId',
      }).pipe(traceUntilFirst('fireStore'))
    );
  }

  public getNutritionDocument(noteId: string): Observable<DocumentData> {
    return this._nutritionDocumentData((userId: string) =>
      docData(doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`), {
        idField: 'noteId',
      })
    );
  }

  public deleteNutritionDocument(noteId: string): Observable<void> {
    return this._nutritionDocumentData(
      (userId) =>
        deleteDoc(doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`)),
      takeOnce
    );
  }

  public addNutritionDocument(note: NutritionNote): Observable<unknown> {
    return this._nutritionDocumentData(
      (userId) =>
        addDoc(collection(this._fireStore, `nutrition/${userId}/notes`), note),
      takeOnce
    );
  }

  public updateNutritionDocument(
    noteId: string,
    note: NutritionNote
  ): Observable<void> {
    return this._nutritionDocumentData(
      (userId) =>
        updateDoc(
          doc(this._fireStore, `nutrition/${userId}/notes/${noteId}`),
          note
        ),
      takeOnce
    );
  }

  private _nutritionDocumentData<T>(
    fn: (userId: string) => Observable<T> | Promise<T>,
    opFn: () => OperatorFunction<User | null, User> = () =>
      filter((user): user is User => user !== null)
  ): Observable<T> {
    return this._auth.user$.pipe(
      opFn(),
      map(({ uid }) => uid),
      switchMap(fn)
    );
  }
}
