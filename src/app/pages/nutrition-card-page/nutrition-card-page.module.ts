import { NgModule } from '@angular/core';
import { NutritionCardPageComponent } from './nutrition-card-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardPageComponent,
  },
];

@NgModule({
  declarations: [NutritionCardPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionCardPageModule {}
