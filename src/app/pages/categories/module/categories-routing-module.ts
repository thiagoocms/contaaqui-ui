import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Categories} from '../categories';

const routes: Routes = [
  {
    path: '',
    component: Categories,
  },

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
