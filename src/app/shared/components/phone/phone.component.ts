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
  @Input() clients: any[];
  @Input() ifDisable: boolean = false;
  phoneSize: number;
  filteredOptions: string[] = [];
  constructor() {
    this.filteredOptions = this.clients;
  }

  ngOnInit(): void {
    this.phoneSize = countryConfig.phoneSize;
  }

  onChangePhone(value: string) {
    this.filteredOptions = this.clients?.filter(option => option.phone.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  clickAutocompleteClient(client) {
    this.parentForm?.patchValue({
      ...client,
      first_name: client.firstName,
      last_name: client.lastName,
      address: ''
    })
  }

}
