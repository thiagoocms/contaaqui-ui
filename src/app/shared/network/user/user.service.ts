import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../services/base.service';
import {UserModel} from './user.model';
import {AuthDataService} from '../auth/auth-data.service';

@Injectable()
export class UserService extends BaseService<UserModel, number> {
  constructor(http: HttpClient, authDataService: AuthDataService) {
    super(http, 'v1/users', authDataService);
  }
}
