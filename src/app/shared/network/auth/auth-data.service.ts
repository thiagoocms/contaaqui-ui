import {inject, Injectable, Injector} from '@angular/core';
import {AUTH} from '../../../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';
import {Auth} from './auth.model';
import {AuthService} from './auth.service';
import { ToastrService } from 'ngx-toastr';
import {WalletService} from '../wallet/wallet.service';
import {UserProfileEnum} from '../user/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthDataService {

  private readonly router: Router = inject(Router);
  private readonly injector: Injector = inject(Injector);
  private readonly toast: ToastrService = inject(ToastrService);

  setToken(token: string): void {
    localStorage.setItem(AUTH.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH.TOKEN_KEY);
  }

  getTokenAccess(): string | null {
    return JSON.parse(<string>this.getToken())?.token;
  }

  getUserId(): number {
    const data =JSON.parse(<string>this.getToken());
    return data?.userId;
  }

  getProfile(): string | null {
    const token = this.getTokenAccess();
    if (!token) return null;

    try {
      const {profile} = jwtDecode<{ profile: string }>(token);
      return profile;
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getTokenAccess();
    if (!token) return true;

    try {
      const {exp} = jwtDecode<{ exp: number }>(token);
      if (!exp) return true;
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > exp;
    } catch (error) {
      return true;
    }
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.toast.warning("Sessão expirada");
    this.router.navigate(['/auth']);

  }

  login(login: string, password: string)  {
    let pass = `${login}:${password}`
    let hash = btoa(pass);
    this.setHash(hash);
    this.sendAuth(hash);
  }

  getWalletId(): number | null {
    const token = this.getTokenAccess();
    if (!token) return null;

    try {
      const {walletId} = jwtDecode<{ walletId: number }>(token);
      return walletId;
    } catch (error) {
      return null;
    }
  }

  setHash(hash: string): void {
    localStorage.setItem(AUTH.HASH_KEY, hash);
  }

  getHash(): string | null {
    return localStorage.getItem(AUTH.HASH_KEY);
  }

  sendAuth(hash: string): void {
    let auth: Auth = {
      auth: hash
    }
    this.injector.get(AuthService).login(auth).subscribe({
      next: data => {
        this.setToken(JSON.stringify(data));
        this.verifyWallet();
        this.router.navigate(["/pages"]);
      },
      error: err => {
        this.toast.error(err.error?.message ?? err.message);
      }
    })
  }

  verifyWallet(): void {
    if (!this.getWalletId()) {
      this.injector.get(WalletService).create({
        userId: this.getUserId(),
        balance: 0
      }).subscribe({
        next: () => {
          this.sendAuth(this.getHash()!!)
        }
      });
    }
  }

}
