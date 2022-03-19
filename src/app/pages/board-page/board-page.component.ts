import { CardsServiceService } from './../../cards-service.service';
import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Card } from './cards';
import { NgForm } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';


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
    BoardID: this.boardId, 
    Title: "Super Sex-y idea", 
    ColumnName: "TODO"
  };

  cards: Card[] = [{
    BoardID: this.boardId, 
    CardID: 1,  
    Title: "Sexy Card", 
    ColumnName: "Ideas"
  }];


  columns = ["Ideas", "Todos", "Done"]

  ideas: string[] = ["Sexy Card"];
  todos: string[] = [];
  done: string[] = [];
  trash: string[] = [];
  
  columnName = {"IDEAS": this.ideas , "TODO" : this.todos, "DONE": this.done}; 

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.container.id === "trash-bin") {
      // this.droppedIntoCan(event);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      let card = this.getCardFromList(event.container.data, event.currentIndex);
      
      card.ColumnName = this.getListNameFromDropContainerId(event);
      
      console.log(event);
      this.updateCard(card);
    }
  }

  getListNameFromDropContainerId(event: CdkDragDrop<string[]>): string { 
    let id: string = event.container.id; 

    let strArray: string[] = id.split("-"); 

    return this.columns[parseInt(strArray[3])];
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
      
      column = data[i].ColumnName;

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


  addCard(): void {
    this.cardsService.addCard(this.card).subscribe((data: Card) => { 
      this.cards.push(data); 
      console.log(data);
      this.splitData(data);
      })
  }
  
  onTitleChange(event: string[]): void { 
    this.card.Title = event[0]; 
    this.card.ColumnName = event[1];
    this.addCard();
  }

  updateCard(card: Card) {

    this.cardsService
      .update(card)
      .subscribe(
        (res) => {
          
        }
      );
  }

  getCardFromList(list: string[], index: number): Card { 
    let title: string = list[index];
    let j: number = -1; 
    for(let i = 0; i < this.cards.length; i++) { 
      if (this.cards[i].Title === title) { 
        j = i; 
      }
    }
    return this.cards[j];
  }

  // droppedIntoCan(event: CdkDragDrop<string[]>) { 
//     let title = this.removeCardFromCards(event.container.data, event.currentIndex);

//     this.removeTitleFromArray(this.getListNameFromDropContainerId(event), title);
//   }

//   /**
//    * Removes the card from cards list and returns its title 
//    * @param list 
//    * @param index 
//    */
//   removeCardFromCards(list: string[], index: number): string { 
//     let title: string = list[index];
//     let j: number = -1; 
//     for(let i = 0; i < this.cards.length; i++) { 
//       if (this.cards[i].Title === title) { 
//         j = i; 
//       }
//     }

//     this.cards.splice(j, 1);
//     return title;
//   }

//   removeTitleFromArray(columnName: string, title: string) { 
//     switch(columnName) { 
//       case this.columns[0]:
//         this.removeItemFromArray(this.ideas, title);
//         break;
//       case this.columns[1]:
//         this.removeItemFromArray(this.todos, title);
//         break;
//       case this.columns[2]:
//         this.removeItemFromArray(this.done, title);
//         break;
//     }
//   }

//   removeItemFromArray(array: any[], item: any) { 
//     let j: number = 0; 
//     for (let i = 0; i < array.length; i++) { 
//       if (array[i] === item) 
//         j = i; 
//         break;
//     }

//     array.splice(j, 1);
//   }
}

