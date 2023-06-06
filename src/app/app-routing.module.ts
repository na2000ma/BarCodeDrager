import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'barCode',
    loadChildren: () =>
      import('../app/bar-code/bar-code.module').then((m) => m.BarCodeModule),
  },

  {
    path: 'production',
    loadComponent: () => import('./@generator/components/production-container/production-container.component')
    .then(c => c.ProductionContainerComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
