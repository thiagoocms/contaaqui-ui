import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { Table } from './table/table';
import { Button } from './button/button';
import { Toggle } from './toggle/toggle';
import {FormsModule} from '@angular/forms';
import { CardItem } from '../../pages/home/card-item/card-item';
import {TypeaheadDirective, TypeaheadModule} from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    InputComponent,
    Table,
    Button,
    Toggle,
    CardItem
  ],
  imports: [
    CommonModule,
    FaIconComponent,
    FormsModule,
    TypeaheadModule.forRoot(),
  ],

    exports: [
        InputComponent,
        Table,
        Button,
        Toggle,
        CardItem
    ]
})
export class BaseModule {
}
