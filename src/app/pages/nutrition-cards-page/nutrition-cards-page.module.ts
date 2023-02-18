import { NgModule } from '@angular/core';
import { NutritionCardsPageComponent } from './nutrition-cards-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NutritionAuthGuardService } from '../..//guards/nutrition-auth.guard.service';
import { MatButtonModule } from '@angular/material/button';
import { NutritionCardComponent } from './components/nutrition-card/nutrition-card.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { HandleClickEventModule } from '../../modules/handle-click-event/handle-click-event.module';
import { NutritionAllCaloriesPipe } from './components/nutrition-card/nutrition-all-calories.pipe';
const routes: Routes = [
  {
    path: '',
    component: NutritionCardsPageComponent,
    canActivate: [NutritionAuthGuardService],
  },
];

@NgModule({
  declarations: [
    NutritionCardsPageComponent,
    NutritionCardComponent,
    NutritionAllCaloriesPipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    OverlayModule,
    MatIconModule,
    HandleClickEventModule,
  ],
})
export class NutritionCardsPageModule {}
