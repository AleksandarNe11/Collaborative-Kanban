import { LandingPageService } from './../landing-page.service';
import { CardsServiceService } from '../cards-service.service';
import { Component, Input, OnInit } from '@angular/core';
import {RouterModule, Router, } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(
    private route: Router, 
    private landingService: LandingPageService, 
    private cardService: CardsServiceService
    ) { }
  
  @Input()
  boardName: string; 

  boardId: number = 1; 

  ngOnInit(): void {
  }

  joinPassBoardIDandNavigate() { 
    console.log("this.boradname:" + this.boardName);
    this.landingService.getBoardID(this.boardName).subscribe(
      (res) => { 

        if (res[0]){
          this.boardId = res[0]["BoardID"];
          this.cardService.setBoardName(this.boardName); 

          this.route.navigate(["board"], {queryParams: {boardId: this.boardId}});
        } else{
          alert("Board Not Found!!");
        }
      }
    )
  
  }

  createPassBoardIDandNavigate() { 
    console.log("this.boradname:" + this.boardName);
    this.landingService.createBoard(this.boardName).subscribe(
      (res) => { 

        console.log(res[0]);

        if (res[0]){
          this.boardId = res[0]["BoardID"];
          this.cardService.setBoardName(this.boardName); 

          this.route.navigate(["board"], {queryParams: {boardId: this.boardId}});
        } else{
          alert("Board Already Exists!!");
        }
      }
    )
  
  }

}
