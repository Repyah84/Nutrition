import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './nutrition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NutritionHeaderModule } from './modules/nutrition-header/nutrition-header.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { NUTRITION_DOCUMENT_DATA } from './tokens/nutrition-document-data';
import { NUTRITION_HANDLE_ROUTING_DATA_TOKEN } from './tokens/nutrition-handle-routing-data.token';
import { NutritionNutritionixStateService } from './services/nutrition-nutritionix-state.service';

@NgModule({
  declarations: [NutritionComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    NutritionRoutingModule,
    BrowserAnimationsModule,
    NutritionHeaderModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    {
      provide: NUTRITION_DOCUMENT_DATA,
      useExisting: NUTRITION_HANDLE_ROUTING_DATA_TOKEN,
    },
  ],
  bootstrap: [NutritionComponent],
})
export class NutritionModule {}
