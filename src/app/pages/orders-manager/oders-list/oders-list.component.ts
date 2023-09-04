import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oders-list',
  templateUrl: './oders-list.component.html',
  styleUrls: ['./oders-list.component.scss']
})
export class OdersListComponent implements OnInit {
  @Input() list;
  @Input() id;
  @Input() connectedTo;
  constructor() { }

  ngOnInit(): void {
    console.log(this.list, this.connectedTo, this.id)
  }

  drop($event: CdkDragDrop<any>) {
    console.log("DROP EVENT", $event)
    if ($event.previousContainer === $event.container) {
      return
    } else {
      console.log(this.list)
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }
  }

}
