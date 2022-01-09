import { NgModule } from '@angular/core';
import { NutritionProfilePageComponent } from './nutrition-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NutritionAuthGuardSrvice } from 'src/app/guards/nutrition-auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionProfilePageComponent,
    canActivate: [NutritionAuthGuardSrvice],
  },
];

@NgModule({
  declarations: [NutritionProfilePageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionProfilePageModule {}
