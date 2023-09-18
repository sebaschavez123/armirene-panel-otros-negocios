import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _router: Router) { }

  holaMundo() {
    this._router.navigateByUrl("/authentication/login")
  }
}
