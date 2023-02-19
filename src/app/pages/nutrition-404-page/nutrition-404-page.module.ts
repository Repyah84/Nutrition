import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { Nutrition404PageComponent } from './nutrition-404-page.component';

const routes: Routes = [
  {
    path: '',
    component: Nutrition404PageComponent,
  },
];

@NgModule({
  declarations: [Nutrition404PageComponent],
  imports: [RouterModule.forChild(routes), MatButtonModule, MatIconModule],
})
export class Nutrition404PageModule {}
