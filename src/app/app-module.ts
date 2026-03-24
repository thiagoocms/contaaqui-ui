import {LOCALE_ID, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {Wrapper} from './layout/wrapper/wrapper';
import {Header} from './layout/header/header';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {NgOptimizedImage} from '@angular/common';
import {Sidebar} from './layout/sidebar/sidebar';
import {provideToastr} from 'ngx-toastr';
import {BaseModule} from './layout/components/base-module';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {LoadingComponent} from './layout/loading/loading.component';
import {provideLottieOptions} from 'ngx-lottie';
import player from 'lottie-web';

@NgModule({
  declarations: [
    App,
    Wrapper,
    Header,
    Sidebar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    BaseModule,
    FaIconComponent,
    LoadingComponent,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideToastr({
      timeOut: 1500, // tempo de exibição do toast
      positionClass: 'toast-top-right', // Posição simples
      preventDuplicates: true, // Evitar duplicação
      closeButton: true, // Exibir botão de fechar
      progressBar: true, // Mostrar barra de progresso
      progressAnimation: 'increasing', // Animação de progresso
      tapToDismiss: true, // Fechar ao clicar
    }),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideLottieOptions({
      player: () => player
    })
  ],
  exports: [],
  bootstrap: [App]
})
export class AppModule {
}
