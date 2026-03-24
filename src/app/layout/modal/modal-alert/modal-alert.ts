import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import {BaseModule} from '../../components/base-module';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.html',
  styleUrls: ['./modal-alert.css'],
  standalone: true,
  imports: [
    BaseModule
  ]
})
export class ModalAlert {
    title: string | undefined ;
    message: string | undefined ;
    result: Subject<boolean>;
    labelButtonCancel: string = 'COMMON.CANCEL';
    labelButtonConfirm: string = 'COMMON.CONFIRM';
    showButtonCancel: boolean = true;
    showButtonConfirm: boolean = true;
    constructor(public modal: BsModalRef) {
        this.result = new Subject<boolean>();
    }

    private processResult(isConfirmed: boolean): void {
        this.result.next(isConfirmed);
        this.modal.hide();
    }

    confirm() {
        this.processResult(true);
    }

    cancel() {
        this.processResult(false);
    }
}
