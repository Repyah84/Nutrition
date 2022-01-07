import { NgModule } from '@angular/core';
import { NutritionProfilePageComponent } from './nutrition-profile-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NutritionProfilePageComponent,
  },
];

@NgModule({
  declarations: [NutritionProfilePageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionProfilePageModule {}
