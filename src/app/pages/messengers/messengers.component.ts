import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-messengers',
  templateUrl: './messengers.component.html',
  styleUrls: ['./messengers.component.scss']
})
export class MessengersComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      state: '',
      city: ''
    });
  }
}
