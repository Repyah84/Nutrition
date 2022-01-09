import { NgModule } from '@angular/core';
import { NutritionSingInPageComponent } from './nutrition-sing-in-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NutritionUnautnGuardService } from 'src/app/guards/nutrition-unauth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionSingInPageComponent,
    canActivate: [NutritionUnautnGuardService],
  },
];

@NgModule({
  declarations: [NutritionSingInPageComponent],
  imports: [RouterModule.forChild(routes), MatButtonModule],
})
export class NutritionSingInPageModule {}
