import { NgModule } from '@angular/core';
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
  imports: [RouterModule.forChild(routes)],
})
export class Nutrition404PageModule {}
