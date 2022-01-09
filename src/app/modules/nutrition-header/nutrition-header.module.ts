import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionHeaderComponent } from './nutrition-header.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NutritionHeaderComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [NutritionHeaderComponent],
})
export class NutritionHeaderModule {}
