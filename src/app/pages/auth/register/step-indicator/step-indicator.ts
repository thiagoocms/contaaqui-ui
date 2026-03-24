import {Component, Input} from '@angular/core';
import {faCheck, faClipboardList} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-step-indicator',
  standalone: false,
  templateUrl: './step-indicator.html',
  styleUrl: './step-indicator.scss'
})
export class StepIndicator {

  @Input() stepIndex: number = 1;
  @Input() stepReference: number = 1;
  faCheck = faCheck;
  faClipboardList = faClipboardList;


}
