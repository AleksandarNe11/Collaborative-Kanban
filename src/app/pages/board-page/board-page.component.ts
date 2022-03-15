import { CardsServiceService } from './../../cards-service.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { Card } from './cards';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  constructor(private cardsService: CardsServiceService) {}

  ngOnInit(): void {
    this.cardsService.getAll(1);
  }

  cards: Card[] = []; 

  ideas = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  todos = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  done: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log(event);
      console.log("same list drop");
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      console.log(this.ideas);
      console.log(this.todos);
    }
  }
}

