import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NutritionAuthService } from 'src/app/auth/nutrition-auth.service';
import { switchMap } from 'rxjs/operators';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.enum';
import { Observable, Subscription } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-nutrition-sing-in-page',
  templateUrl: './nutrition-sing-in-page.component.html',
  styleUrls: ['./nutrition-sing-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionSingInPageComponent implements OnDestroy {
  private readonly _subscription = new Subscription();

  public constructor(
    private readonly _auth: NutritionAuthService,
    private readonly _router: Router
  ) {}

  public onSingInGoogle(): void {
    this._authAction(() => this._auth.loginWithGoogle());
  }

  public onSingInAnonymous(): void {
    this._authAction(() => this._auth.loginAnonymously());
  }

  private _authAction(fun: () => Observable<UserCredential>): void {
    this._subscription.add(
      fun()
        .pipe(
          switchMap(() => this._router.navigate([NutritionRoutersPages.NOTES]))
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
