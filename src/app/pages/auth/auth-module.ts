import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing-module';
import {Login} from './login/login';
import {BaseModule} from '../../layout/components/base-module';
import {Auth} from './auth/auth';
import {Register} from './register/register';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StepIndicator} from './register/step-indicator/step-indicator';
import {InputPassword} from './components/input-password/input-password';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDataModule} from '../../shared/network/user/user.module';

@NgModule({
  declarations: [
    Login,
    Auth,
    Register,
    StepIndicator,
    InputPassword
  ],
  imports: [
    AuthRoutingModule,
    BaseModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    UserDataModule,
  ],

})
export class AuthModule {
}
