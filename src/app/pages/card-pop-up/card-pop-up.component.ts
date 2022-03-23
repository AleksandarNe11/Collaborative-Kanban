import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit } from '@angular/core';


import { Input, Output } from '@angular/core';

import {Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-pop-up',
  templateUrl: './card-pop-up.component.html',
  styleUrls: ['./card-pop-up.component.scss']
})
export class CardPopUpComponent implements OnInit {

  @Input()
  public column: string = "";

  @Input()
  public title: string = "";

  @Output() titleChange = new EventEmitter<string[]>(); 

  // @Output() titleChange = new EventEmitter<string>(); 


  closeResult: string = "";

  constructor(
    private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // submit() { 
  //   this.titleChange.emit(this.title);
  //   this.title = "";
  //   this.modalService.dismissAll();
  // }

  submit() { 

    let str_array: string[] = [this.title, this.column]
    this.titleChange.emit(str_array);

    this.title = "";
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
