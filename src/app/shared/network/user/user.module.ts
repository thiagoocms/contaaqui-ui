import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkModule} from '../network.module';
import {UserService} from './user.service';

@NgModule({
  imports: [CommonModule, NetworkModule],
  providers: [UserService],
  exports: []
})
export class UserDataModule {
}
