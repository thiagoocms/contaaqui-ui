import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../services/base.service';
import {AuthDataService} from '../auth/auth-data.service';
import {WalletModel} from './wallet.model';

@Injectable({
  providedIn: 'root',
})
export class WalletService extends BaseService<WalletModel> {
  constructor(http: HttpClient, authDataService: AuthDataService) {
    super(http, 'v1/wallets', authDataService);
  }
}
