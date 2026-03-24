import {Component, inject, OnInit, PipeTransform} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {DocumentMaskPipe} from '../../../shared/pipes/document-mask.pipe';
import {documentValidator} from '../../../shared/validators/document.validator';
import {UserService} from '../../../shared/network/user/user.service';
import {UserDocumentTypeEnum, UserModel, UserProfileEnum} from '../../../shared/network/user/user.model';
import {AuthService} from '../../../shared/network/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AuthDataService} from "../../../shared/network/auth/auth-data.service";
import {WalletService} from '../../../shared/network/wallet/wallet.service';
import {HttpHeaders} from '@angular/common/http';


@Component({
    selector: 'app-register',
    standalone: false,
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class Register {

    private readonly router: Router = inject(Router)
    private readonly formbuilder: FormBuilder = inject(FormBuilder);
    private readonly userService: UserService = inject(UserService);
    private readonly authDataService: AuthDataService = inject(AuthDataService);
    private readonly walletService: WalletService = inject(WalletService);
    private readonly toast: ToastrService = inject(ToastrService);


    public documentPipe: PipeTransform = new DocumentMaskPipe();

    public step = 0
    public stepReference: number = 3;
    public buttonMsg = "Continuar"
    public arrowLeft = faArrowLeft
    public form = this.formbuilder.group({
        name: new FormControl({
            value: '',
            disabled: false
        }, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
        email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]),
        document: new FormControl({value: '', disabled: false}, [Validators.required, documentValidator()]),
        login: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(6)]),
        password: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(6)]),
    });

    public changeStep(number = 1): void {

        if (this.step + number < 0) {
            this.router.navigate(["/auth"]);
            return;
        }

        if (number > 0) {
            if (!this.isStepValid(this.step)) {
                this.markStepTouched(this.step);
                return;
            }
        }

        this.step += number;
        this.buttonMsg = this.step === this.stepReference ? "Criar" : "Continuar";

        if (this.form.valid && this.step > 3) {
            this.submit();
        }

    }

    private control(name: string): FormControl {
        return this.form.get(name) as FormControl;
    }

    private isStepValid(stepIndex: number): boolean {
        switch (stepIndex) {
            case 1:
                return this.control('name').valid && this.control('document').valid;
            case 2:
                return this.control('login').valid && this.control('email').valid;
            case 3:
                const pw = this.control('password');
                const cpw = this.control('confirmPassword');
                if (pw.value !== cpw.value) {
                    cpw.setErrors({...(cpw.errors || {}), mismatch: true});
                    return false;
                } else {
                    if (cpw.hasError('mismatch')) {
                        const {mismatch, ...rest} = (cpw.errors || {});
                        if (Object.keys(rest).length === 0) {
                            cpw.setErrors(null);
                        } else {
                            cpw.setErrors(rest as any);
                        }
                    }
                }
                return pw.valid && cpw.valid;
            default:
                return true;
        }
    }

    private markStepTouched(stepIndex: number): void {
        const toTouch: string[] = [];
        switch (stepIndex) {
            case 1:
                toTouch.push('name', 'document');
                break;
            case 2:
                toTouch.push('email', 'login');
                break;
            case 3:
                toTouch.push('password', 'confirmPassword');
                break;
            default:
                break;
        }
        toTouch.forEach(name => this.control(name).markAsTouched({onlySelf: true}));
    }

    private submit(): void {
        const payload: UserModel = {
            name: this.control('name').value,
            email: this.control('email').value,
            documentNumber: this.control('document').value.replace(/\D/g, ''),
            documentType: this.control('document').value.length <= 14 ? UserDocumentTypeEnum.CPF : UserDocumentTypeEnum.CNPJ,
            login: this.control('login').value,
            password: this.control('password').value,
            profile: UserProfileEnum.USER,
        };
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        this.userService.create(payload, headers).subscribe({
            next: () => {
                this.authDataService.login(payload.login, payload.password || '')
            },
            error: err => {
                this.toast.error(err?.error?.message ?? err.message);
            }
        });
    }

}
