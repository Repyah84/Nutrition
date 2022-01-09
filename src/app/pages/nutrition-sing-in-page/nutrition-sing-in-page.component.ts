import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NutritionAuthService } from 'src/app/auth/nutrition-auth.service';
import { switchMap } from 'rxjs/operators';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.emun';
import { Observable } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-nutrition-sing-in-page',
  templateUrl: './nutrition-sing-in-page.component.html',
  styleUrls: ['./nutrition-sing-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionSingInPageComponent {
  public constructor(
    private readonly _auth: NutritionAuthService,
    private readonly _router: Router
  ) {}

  public onSingInGoogle(): void {
    this._authAction(() => this._auth.loginWithGoogle());
  }

  public onSingInAnonimus(): void {
    this._authAction(() => this._auth.loginAnonymously());
  }

  private _authAction(fun: () => Observable<UserCredential>): void {
    fun()
      .pipe(
        switchMap(() => this._router.navigate([NutritionRoutersPages.CARDS]))
      )
      .subscribe();
  }
}
