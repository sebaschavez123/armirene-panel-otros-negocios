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
  vzlaCode: number;
  countryCodes = [
    { label: '+57', country: countryConfig.countryName, value: 57 },
    { label: '+58', country: countryConfig.countryName, value: 58 }
  ]
  filteredOptions: string[] = [];
  constructor() {
    this.filteredOptions = this.clients;
  }

  ngOnInit(): void {
    this.countryCodes = this.countryCodes.filter(countryCode => countryCode.value == this.countryConfig.countryCode)
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

  get countryConfig() {
    return countryConfig
  }
}
