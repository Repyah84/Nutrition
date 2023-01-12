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
  bootstrap: [NutritionComponent],
})
export class NutritionModule {}
