import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent {

  @Input() placeHolder: String = '';
  @Input() listOfData: any;
  @Output() newListEvent = new EventEmitter<any>();
  copylistOfData: any[] = [];

  search(search: any) {
    this.copylistOfData = [...this.listOfData];
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          targetValue.push(value);
          break;
        }
      }
    });
    let values = [of(targetValue), search]
    this.newListEvent.emit(values);
  }
}
