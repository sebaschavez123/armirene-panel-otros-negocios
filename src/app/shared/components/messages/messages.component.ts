import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [CommonModule, NzIconModule]
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;


  constructor(public messagesService: MessagesService) {}

  ngOnInit() {
    this.errors$ = this.messagesService.errors$
      .pipe(
        tap(() => this.showMessages = true)
      );
  }

  onClose() {
    this.showMessages = false;
  }

}
