import { NgModule } from '@angular/core';
import { NutritionSingInPageComponent } from './nutrition-sing-in-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NutritionSingInPageComponent,
  },
];

@NgModule({
  declarations: [NutritionSingInPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionSingInPageModule {}
