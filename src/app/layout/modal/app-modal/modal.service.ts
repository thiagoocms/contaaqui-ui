import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare let $: any;
@Injectable({
    providedIn: 'root',
})
export class ModalService {
    public opened: Subject<boolean> = new Subject();
    open(id: string, closeWWithClickBackground = true): void {
        let modal = {
            keyboard: false,
            show: true,
        };

        if (!closeWWithClickBackground) {
            modal = Object.assign({ backdrop: 'static' }, modal);
        }

        $(`#${id}`).modal(modal);
    }

    close(id: string): void {
        $(`#${id}`).modal('hide');
        this.opened.next(false);
    }
}
