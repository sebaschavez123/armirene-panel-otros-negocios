import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  @Input() placeHolder: String = '';
  @Input() listOfData: any = [];
  @Output() newListEvent = new EventEmitter<any[]>();
  copylistOfData: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.copylistOfData = [...this.listOfData];
  }

  search(search: any) {
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
    this.newListEvent.emit(targetValue);
  }
}


