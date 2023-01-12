import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionRoutersPages } from './types/nutrition-routing-pages.enum';

const nutritionRoutes: Routes = [
  {
    path: NutritionRoutersPages.NOTES,
    loadChildren: () =>
      import('./pages/nutrition-cards-page/nutrition-cards-page.module').then(
        (m) => m.NutritionCardsPageModule
      ),
  },
  {
    path: NutritionRoutersPages.NOTE,
    loadChildren: () =>
      import('./pages/nutrition-card-page/nutrition-card-page.module').then(
        (m) => m.NutritionCardPageModule
      ),
  },
  {
    path: NutritionRoutersPages.PROFILE,
    loadChildren: () =>
      import(
        './pages/nutrition-profile-page/nutrition-profile-page.module'
      ).then((m) => m.NutritionProfilePageModule),
  },
  {
    path: NutritionRoutersPages.SING_IN,
    loadChildren: () =>
      import(
        './pages/nutrition-sing-in-page/nutrition-sing-in-page.module'
      ).then((m) => m.NutritionSingInPageModule),
  },
  {
    path: NutritionRoutersPages.SING_UP,
    loadChildren: () =>
      import(
        './pages/nutrition-sing-up-page/nutrition-sing-up-page.module'
      ).then((m) => m.NutritionSingUpPageModule),
  },
  {
    path: '',
    redirectTo: NutritionRoutersPages.NOTES,
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/nutrition-404-page/nutrition-404-page.module').then(
        (m) => m.Nutrition404PageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(nutritionRoutes)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
