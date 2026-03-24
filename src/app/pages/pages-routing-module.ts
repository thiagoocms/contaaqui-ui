import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';

const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/module/categories-module').then((m) => m.CategoriesModule),
  },
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
