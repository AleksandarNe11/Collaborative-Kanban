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
    title: "Super Sex-y idea", 
    columnName: "TODO"
  };

  cards: Card[] = [];


  columns = ["Ideas", "Todos", "Done"]

  ideas: string[] = [];

  todos: string[] = [];
  done: string[] = [];
  
  columnName = {"IDEAS": this.ideas , "TODO" : this.todos, "DONE": this.done}; 

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
    // console.log(this.cards);
    this.cardsService.getAll(this.boardId).subscribe((data: Card[]) => { 
      this.cards = data; 
      this.splitData(data);
    }
    )
  }
  
  
  // {
  //   =>(data: Card[]) { 
  //     // super.this.cards = data; 
  //     console.log("Next");
  //     console.log(super.this.cards);
  //   }, 
  //   error(msg) { 
  //     console.log("Error retrieving cards: " + msg);
  //   }
  // }

  splitData(data: any){
    console.log(data);
    let column: string = "";
    for(let i = 0; i < data.length;i++){
      
      column = data[i].ColoumnName;

      switch(column) {
        case "IDEAS":
          // code block
          this.ideas.push(data[i].Title);
          break;
        case "TODO":
          // code block
          this.todos.push(data[i].Title);
          break;
        case "DONE":
          // code block
          this.done.push(data[i].Title);
          break;
      } 
    }
    console.log(this.ideas);
    console.log(this.todos);
    console.log(this.done);
  }

  addCard() {
    this.cardsService.addCard(this.card).subscribe((data: Card) => { 
      this.cards.push(data); 
      console.log(data);
      this.splitData(data);
      })
  }
  
  onTitleChange(event: string) { 
    this.card.title = event; 
    this.addCard();
    console.log(event);
  }

}

