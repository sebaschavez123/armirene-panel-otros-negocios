import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() isLoading = false;
  @Input() small = false;
  @Input() medium = false;
  @Input() large = false;
  @Input() default = true;
  src = 'assets/svg/icon-spinner-white.svg';

  constructor(public _loadingService: LoadingService) {}

  ngOnInit() {
    if (!this.default) {
      this.src = 'assets/svg/icon-spinner.svg';
    }
  }
}
