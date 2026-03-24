import {NgModule} from '@angular/core';
import {PagesRoutingModule} from './pages-routing-module';
import {CommonModule} from '@angular/common';
import {Home} from './home/home';
import {ReactiveFormsModule} from '@angular/forms';
import { Dashboard } from './dashboard/dashboard';
import {BaseChartDirective} from 'ng2-charts';
import {BaseModule} from '../layout/components/base-module';
import {Page} from '../layout/page/page';
import {Modal} from '../layout/modal/app-modal/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CategoryDataModule} from '../shared/network/category/category.module';
import {TransactionDataModule} from '../shared/network/transaction/transaction.module';

@NgModule({
  declarations: [
    Home,
    Dashboard,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    BaseChartDirective,
    BaseModule,
    Page,
    Modal,
    CategoryDataModule,
    TransactionDataModule
  ],
  providers: [BsModalService],

})
export class PagesModule {
  constructor(
    private readonly libary: FaIconLibrary
  ) {
    this.libary.addIconPacks(fas);
  }
}
