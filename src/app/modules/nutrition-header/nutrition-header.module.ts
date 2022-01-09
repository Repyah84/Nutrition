import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionHeaderComponent } from './nutrition-header.component';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { NutritionBodyActionModule } from '../nutrition-body-action/nutrition-body-action.module';

@NgModule({
  declarations: [NutritionHeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    MatIconModule,
    RouterModule,
    NutritionBodyActionModule,
  ],
  exports: [NutritionHeaderComponent],
})
export class NutritionHeaderModule {}
