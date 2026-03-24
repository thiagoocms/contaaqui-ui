import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Login} from './login/login';
import {Register} from './register/register';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
