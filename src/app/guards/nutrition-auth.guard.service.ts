import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NutritionAuthService } from '../auth/nutrition-auth.service';
import { NutritionRoutersPages } from '../types/nutrition-routing-pages.emun';

@Injectable({ providedIn: 'root' })
export class NutritionAuthGuardSrvice implements CanActivate {
  public constructor(
    private readonly _auth: NutritionAuthService,
    private readonly _router: Router
  ) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this._auth.authSate.pipe(
      map((usrSate) =>
        usrSate === null
          ? this._router.parseUrl(`/${NutritionRoutersPages.SING_IN}`)
          : true
      )
    );
  }
}
