import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client.class';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @Input() dataForm : Client;

  constructor() { }

  ngOnInit(): void {
    console.log(this.dataForm)
  }

}
