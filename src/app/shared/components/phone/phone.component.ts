import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { countryConfig } from 'src/country-config/country-config';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() ifDisable: boolean = false;
  phoneSize: number;
  constructor() { }

  ngOnInit(): void {
    this.phoneSize = countryConfig.phoneSize;
  }

  keyPress(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
