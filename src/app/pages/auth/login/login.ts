import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthDataService} from '../../../shared/network/auth/auth-data.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly router: Router = inject(Router);
  private readonly formbuilder: FormBuilder = inject(FormBuilder);
  private readonly authDataService: AuthDataService = inject(AuthDataService);

  public form = this.formbuilder.group({
    login: new FormControl({value: '', disabled: false}, [Validators.required]),
    password: new FormControl({value: '', disabled: false}, [Validators.required]),
  });


  submit() {
    this.authDataService.login(this.form.controls.login.value!!, this.form.controls.password.value!!);
  }


}
