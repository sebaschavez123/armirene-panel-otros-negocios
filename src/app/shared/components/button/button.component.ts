import {
  Component, Input, OnChanges, Output, EventEmitter,
} from '@angular/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string;
  @Input() customClasses: string;
  @Input() isDisabled = false;
  @Input() isLoading = false;
  @Input() isTemplate = false;
  @Input() buttonId = '';
  @Input() spinnerBlack = false;
  @Output() clicked = new EventEmitter();
  @Input() color = '';
  @Input() prefixIcon = '';
  @Input() subfixIcon = '';

  click() {
    this.clicked.emit(true);
  }

  ngOnChanges() {
  }

}
