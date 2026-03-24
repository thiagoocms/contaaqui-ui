import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthDataService} from '../auth/auth-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private readonly authDataService: AuthDataService = inject(AuthDataService);

  canActivate(): boolean {
    if (this.authDataService.isTokenExpired()) {
      this.authDataService.logout();
      return false;
    }
    return true;
  }
}
