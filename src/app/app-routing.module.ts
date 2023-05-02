import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarCodeComponent } from './bar-code/bar-code.component';

const routes: Routes = [
  {
    path: 'barCode',
    component: BarCodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
