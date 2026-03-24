import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkModule} from '../network.module';
import {TransactionService} from './transaction.service';

@NgModule({
  imports: [CommonModule, NetworkModule],
  providers: [TransactionService],
  exports: []
})
export class TransactionDataModule {
}
