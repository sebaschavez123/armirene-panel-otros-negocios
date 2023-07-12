import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-order-message',
  templateUrl: './order-message.component.html',
  styleUrls: ['./order-message.component.scss']
})
export class OrderMessageComponent {
  showMessages = false;
  errors$: Observable<string[]>;

  constructor(public _messagesService: MessagesService) { }

  ngOnInit() {
    this.errors$ = this._messagesService.errors$
      .pipe(tap((res) => res[0] == 'Success' ? this.showMessages = false : this.showMessages = true));
  }
}
