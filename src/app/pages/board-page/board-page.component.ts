import { CardsServiceService } from './../../cards-service.service';
import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Card } from './cards';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  constructor(
    private cardsService: CardsServiceService, 
    ) {}

  ngOnInit(): void {
    this.getCards();
  }

  closeResult: string = "";

  boardId: number = 1;

  open(): void { 
    console.log("Opened Modal?");
  }

  card: Card = {
    boardId: this.boardId, 
    title: "", 
    columnName: "Ideas"
  };

  cards: Card[] = [];

  columns = ["Ideas", "Todos", "Done"]

  ideaTitle = "";
  
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

  /**
   * Makes request for all cards associated with boardId
   * and populates Cards array with return values. 
   * 
   * Still needs to parse and split the Cards Array into 
   * each of the subarrays 
   */
  getCards() { 
    this.cardsService.getAll(this.boardId).subscribe((data: Card[]) => { 
      this.cards = data; 
      console.log(data);
    }
    )
  }


  addCard() {
    this.cardsService.addCard(this.card).subscribe((data: Card) => { 
      this.cards.push(data); 
      console.log(data);
    })
  }
  
  onTitleChange(event: string) { 
    this.card.title = event; 
    this.addCard();
    console.log(event);
  }

}

