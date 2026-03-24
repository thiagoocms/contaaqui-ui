import {Component, Input} from '@angular/core';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: false,
  templateUrl: './input-password.html',
})
export class InputPassword {

  @Input() label: string = 'Senha';
  @Input() formName: string = '';
  @Input() formG: FormGroup = new FormGroup({});
  showPassword = false
  visibility = faEye
  visibilityOff = faEyeSlash

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
