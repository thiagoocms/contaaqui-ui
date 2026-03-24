import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Wrapper} from './layout/wrapper/wrapper';
import {Auth} from './pages/auth/auth/auth';
import {AuthGuard} from './shared/network/services/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: Wrapper,
    loadChildren: () =>
      import('./pages/pages-module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    component: Auth,
    loadChildren: () =>
      import('./pages/auth/auth-module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
