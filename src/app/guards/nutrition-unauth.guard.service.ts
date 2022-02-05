import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';
import { NutritionAuthService } from '../auth/nutrition-auth.service';

@Injectable({ providedIn: 'root' })
export class NutritionUnAuthGuardService implements CanActivate {
  public constructor(private readonly _auth: NutritionAuthService) {}

  public canActivate(): Observable<boolean> {
    return this._auth.user$.pipe(
      switchMap((userState) =>
        userState === null ? of(true) : this._auth.logout().pipe(mapTo(true))
      )
    );
  }
}
