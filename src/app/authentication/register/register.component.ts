import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private _router: Router,
    private _vm: RegisterVm,
    private _fb: UntypedFormBuilder,
  ) { }

  holaMundo() {
    this._router.navigateByUrl("/authentication/login")
  }

  ngOnInit() {
    this.registerForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  register(data) {
    console.log(data);
    this._vm.register(data).subscribe(res => console.log(res))
  }
}
