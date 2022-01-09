import { NgModule } from '@angular/core';
import { NutritionSingUpPageComponent } from './nutrition-sing-up-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NutritionUnautnGuardService } from 'src/app/guards/nutrition-unauth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionSingUpPageComponent,
    canActivate: [NutritionUnautnGuardService],
  },
];

@NgModule({
  declarations: [NutritionSingUpPageComponent],
  imports: [RouterModule.forChild(routes)],
})
export class NutritionSingUpPageModule {}
