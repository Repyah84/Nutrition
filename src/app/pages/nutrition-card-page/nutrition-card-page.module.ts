import { NgModule } from '@angular/core';
import { NutritionCardPageComponent } from './nutrition-card-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NutritionAuthGuardSrvice } from 'src/app/guards/nutrition-auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardPageComponent,
    canActivate: [NutritionAuthGuardSrvice],
  },
];

@NgModule({
  declarations: [NutritionCardPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class NutritionCardPageModule {}
