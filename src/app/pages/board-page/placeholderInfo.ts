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