import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NutritionAuthService } from 'src/app/auth/nutrition-auth.service';
import { nutritionRoutes } from 'src/app/nutrition-routing.module';
import { NutritionRoutersPages } from 'src/app/types/nutrition-routing-pages.emun';

@Component({
  selector: 'header[nutrition-header]',
  templateUrl: './nutrition-header.component.html',
  styleUrls: ['./nutrition-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutritionHeaderComponent {
  public readonly routes = nutritionRoutes;

  public constructor(
    private readonly _auth: NutritionAuthService,
    private readonly _router: Router
  ) {}

  public onLogAout(): void {
    this._auth.logout().subscribe(() => {
      this._router.navigate([NutritionRoutersPages.SING_IN]);
    });
  }
}
