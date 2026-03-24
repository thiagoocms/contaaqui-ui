import {Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgClass, NgStyle} from '@angular/common';
import {BaseModule} from '../../components/base-module';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  imports: [
    NgClass,
    BaseModule
  ]
})
export class Modal implements OnDestroy {

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() id: string = '';
  @Input() footer = true;
  @Input() showModalCenter = true;
  @Input() classFooter = '';
  subscriptions = new Array<Subscription>();

  @Output() modalAbertoEmitter: EventEmitter<any> = new EventEmitter();
  @Input() maxWidth: string = '100%';

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  get template() {
    return this.modalTemplate;
  }

}
