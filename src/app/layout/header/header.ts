import {Component, inject} from '@angular/core';
import {AuthDataService} from '../../shared/network/auth/auth-data.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  private readonly authDataService: AuthDataService = inject(AuthDataService);

  logout() {
    this.authDataService.logout();
  }

}
