import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.scss']
})
export class OrdersManagerComponent {

  listNumber1 = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  listNumber2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  listNumber3 = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

}
