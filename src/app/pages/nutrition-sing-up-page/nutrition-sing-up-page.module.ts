import { NgModule } from '@angular/core';
import { NutritionSingUpPageComponent } from './nutrition-sing-up-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NutritionSingUpPageComponent,
  },
];

@NgModule({
  declarations: [NutritionSingUpPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionSingUpPageModule {}
