import { NgModule } from '@angular/core';
import { NutritionCardsPageComponent } from './nutrition-cards-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardsPageComponent,
  },
];

@NgModule({
  declarations: [NutritionCardsPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionCardsPageModule {}
