import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../services/base.service';
import {AuthDataService} from '../auth/auth-data.service';
import {TransactionModel} from './transaction.model';


@Injectable()
export class TransactionService extends BaseService<TransactionModel> {
  constructor(http: HttpClient, authDataService: AuthDataService) {
    super(http, 'v1/transactions', authDataService);
  }
}
