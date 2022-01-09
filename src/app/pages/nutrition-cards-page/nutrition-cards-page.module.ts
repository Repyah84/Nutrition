import { NgModule } from '@angular/core';
import { NutritionCardsPageComponent } from './nutrition-cards-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NutritionUnauthGuardSrvice } from 'src/app/guards/nutrition-auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardsPageComponent,
    canActivate: [NutritionUnauthGuardSrvice],
  },
];

@NgModule({
  declarations: [NutritionCardsPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class NutritionCardsPageModule {}
