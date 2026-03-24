import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

platformBrowser().bootstrapModule(AppModule, {
})
  .catch(err => console.error(err));
