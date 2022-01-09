import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NutritionAuthService } from 'src/app/auth/nutrition-auth.service';
import { switchMap } from 'rxjs/operators';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.emun';

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
    this._auth
      .loginWithGoogle()
      .pipe(
        switchMap((r) => {
          console.log('GOGLE', r);

          return this._router.navigate([NutritionRoutersPages.CARDS]);
        })
      )
      .subscribe();
  }

  public onSingInAnonimus(): void {
    this._auth
      .loginAnonymously()
      .pipe(
        switchMap((r) => {
          console.log('onSingInAnonimus', r);

          return this._router.navigate([NutritionRoutersPages.CARDS]);
        })
      )
      .subscribe();
  }
}
