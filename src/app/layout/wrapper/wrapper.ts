import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: false,
  templateUrl: './wrapper.html',
  styleUrl: './wrapper.scss'
})
export class Wrapper implements OnInit {
    ngOnInit(): void {
        console.log('Component loaded');
    }

}
