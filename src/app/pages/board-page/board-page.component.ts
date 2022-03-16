import { CardsServiceService } from './../../cards-service.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



import { Card } from './cards';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {

  constructor(private cardsService: CardsServiceService) {}

  ngOnInit(): void {
    this.getCards();
    this.addCard();
  }

  boardId: number = 1;

  card: Card = {
    boardId: this.boardId, 
    title: "Super Sex-y idea", 
    columnName: "IDEA"
  };

  cards: Card[] = [];

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

    // confirm card.title is populated w/ a value
    if (this.card.title !== "") { 
      // call the cardsService and await response of 
      // Card object to append to cards array 
      this.cardsService.addCard(this.card).subscribe({
        next(res: Card) {
          super.this.cards.push(res);
          // f.reset(); 
        }, 
        error(err) { 
          console.log("Post Error: " + err);
        }
      })
    }
  }


}

