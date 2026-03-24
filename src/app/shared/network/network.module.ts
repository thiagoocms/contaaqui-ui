import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorCatchingInterceptor} from '../interceptors/error-catching.interceptor';
import {LoadingInterceptor} from '../interceptors/loading.interceptor';
import {LottieComponent} from 'ngx-lottie';

/**
 * Módulo de rede para agrupar infra de HTTP (HttpClientModule, interceptors etc.)
 */
@NgModule({
  imports: [HttpClientModule, LottieComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
],
exports: [HttpClientModule]
})

export class NetworkModule {
}
