import { NgModule } from '@angular/core';
import { NutritionCardPageComponent } from './nutrition-card-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardPageComponent,
  },
];

@NgModule({
  declarations: [NutritionCardPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class NutritionCardPageModule {}
