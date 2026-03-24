import {Component, inject} from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';
import {LoadingService} from '../../shared/network/services/loading.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    LottieComponent,
    CommonModule
  ],
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  private loadingService: LoadingService = inject(LoadingService)
  loading$ = this.loadingService.loading$;

  options: AnimationOptions = {
    path: '/assets/loading.json'
  };


}
