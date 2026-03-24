import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkModule} from '../network.module';
import {CategoryService} from './category.service';

@NgModule({
  imports: [CommonModule, NetworkModule],
  providers: [CategoryService],
  exports: []
})
export class CategoryDataModule {
}
