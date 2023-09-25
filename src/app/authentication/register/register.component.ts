import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { RegisterVm } from 'src/app/core/view-model/register.vm';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    MessagesService
  ],
})
export class RegisterComponent {
  registerForm: UntypedFormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private _router: Router,
    private _vm: RegisterVm,
    private _fb: UntypedFormBuilder,
    private _messagesService: MessagesService
  ) { }

  goLogin() {
    this._router.navigateByUrl("/authentication/login")
  }

  ngOnInit() {
    this.registerForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }


  submitForm(): void {
    const val = this.registerForm.value;
    if (!this.registerForm.invalid) {
      this.register(val);
    } else {
      this.showFormError();
    }
  }

  register(data) {
    this._vm.register(data)
      .pipe(
        catchError(err => {
          let { error: { message } } = err;
          this._messagesService.showErrors(message);
          return throwError(() => err);
        }),
      )
      .subscribe(res => {
        console.log(res);
        if (res) {
          this._router.navigateByUrl("/authentication/login")
        }
      })
  }

  showFormError() {
    Object.values(this.registerForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
