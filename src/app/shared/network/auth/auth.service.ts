import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BaseService } from '../services/base.service';
import {Auth} from './auth.model';
import {AuthDataService} from './auth-data.service';

@Injectable({
  providedIn: 'root',

})
export class AuthService extends BaseService<Auth> {
  constructor(http: HttpClient, authDataService: AuthDataService) {
    super(http, 'v1/auth', authDataService);
  }

  login(auth: Auth)  {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.create(auth, headers);
  }
}
