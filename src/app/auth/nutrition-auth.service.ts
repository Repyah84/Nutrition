import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NutritionAuthService {
  public readonly authSate: Observable<User | null> = authState(this._auth);

  public constructor(private readonly _auth: Auth) {}

  public loginWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(this._auth, new GoogleAuthProvider()));
  }

  public loginAnonymously(): Observable<UserCredential> {
    return from(signInAnonymously(this._auth));
  }

  public logout(): Observable<void> {
    return from(signOut(this._auth));
  }

  // TODO signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
}
