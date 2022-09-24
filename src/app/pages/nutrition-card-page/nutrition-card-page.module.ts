import { NgModule } from '@angular/core';
import { NutritionCardPageComponent } from './nutrition-card-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NutritionAuthGuardService } from 'src/app/guards/nutrition-auth.guard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NutritionBodyActionModule } from 'src/app/modules/nutrition-body-action/nutrition-body-action.module';
import { MatIconModule } from '@angular/material/icon';
import { NutritionNutritionixItemComponent } from './components/nutrition-nutritionix-item/nutrition-nutritionix-item.component';
import { NutritionCardPageResolverService } from './resolvers/nutrition-card-page.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: NutritionCardPageComponent,
    canActivate: [NutritionAuthGuardService],
    resolve: {
      note: NutritionCardPageResolverService,
    },
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
    NutritionBodyActionModule,
  ],
})
export class NutritionCardPageModule {}
