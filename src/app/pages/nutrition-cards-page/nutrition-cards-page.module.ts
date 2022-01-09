import { NgModule } from '@angular/core';
import { NutritionCardsPageComponent } from './nutrition-cards-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardsPageComponent,
  },
];

@NgModule({
  declarations: [NutritionCardsPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class NutritionCardsPageModule {}
