import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionHeaderComponent } from './nutrition-header.component';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { HandleClickEventModule } from '../handle-click-event/handle-click-event.module';
import { NutritionHeaderActionComponent } from './nutrition-header-action/nutrition-header-action.component';

@NgModule({
  declarations: [NutritionHeaderComponent, NutritionHeaderActionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    OverlayModule,
    MatIconModule,
    RouterModule,
    HandleClickEventModule,
  ],
  exports: [NutritionHeaderComponent],
})
export class NutritionHeaderModule {}
