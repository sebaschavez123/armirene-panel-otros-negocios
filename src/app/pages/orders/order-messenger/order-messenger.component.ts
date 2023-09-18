import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-messenger',
  templateUrl: './order-messenger.component.html',
  styleUrls: ['./order-messenger.component.scss']
})
export class OrderMessengerComponent implements OnChanges {
  @Input() messenger: any;
  constructor() {
    console.log(this.messenger, "CONSTRUCTO")
  }

  ngOnInit() {
    console.log(this.messenger, "ONINIT")
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
