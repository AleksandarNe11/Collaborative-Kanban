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
  }

  boardId: number = 1;

  card: Card = {
    boardId: this.boardId, 
    title: "", 
    columnName: "Ideas"
  };

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

  /**
   * Makes request for all cards associated with boardId
   * and populates Cards array with return values. 
   * 
   * Still needs to parse and split the Cards Array into 
   * each of the subarrays 
   */
  getCards() { 
    this.cardsService.getAll(this.boardId).subscribe({
      next(data: Card[]) { 
        super.this.cards = data; 
        console.log(super.this.cards);
      }, 
      error(msg) { 
        console.log("Error retrieving cards: " + msg);
      }
    }
    )
  }

  addCard(f: NgForm) {

    // confirm card.title is populated w/ a value
    if (this.card.title !== "") { 
      // call the cardsService and await response of 
      // Card object to append to cards array 
      this.cardsService.addCard(this.card).subscribe({
        next(res: Card) {
          super.this.cards.push(res);
          f.reset(); 
        }, 
        error(err) { 
          console.log("Post Error: " + err);
        }
      })
    }
  }


}

