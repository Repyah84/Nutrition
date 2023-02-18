import { NgModule } from '@angular/core';
import { NutritionCardPageComponent } from './nutrition-card-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NutritionAuthGuardService } from '../../guards/nutrition-auth.guard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HandleClickEventModule } from '../../modules/handle-click-event/handle-click-event.module';
import { MatIconModule } from '@angular/material/icon';
import { NutritionNutritionixItemComponent } from './components/nutrition-nutritionix-item/nutrition-nutritionix-item.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardPageComponent,
    canActivate: [NutritionAuthGuardService],
  },
];

@NgModule({
  declarations: [NutritionCardPageComponent, NutritionNutritionixItemComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    OverlayModule,
    HandleClickEventModule,
  ],
})
export class NutritionCardPageModule {}
