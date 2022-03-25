import { LandingPageService } from './../landing-page.service';
import { Component, Input, OnInit } from '@angular/core';
import {RouterModule, Router, } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(private route: Router, private landingService: LandingPageService) { }
  
  @Input()
  boardName: string; 

  boardId: number = 1; 

  ngOnInit(): void {
  }

  join() {
    let ID = document.getElementById("boardID");
    let rm = ID?.innerText;
    console.log("TEST");
    //document.getElementById("JOIN").onclick = "location.href='//localhost:4200/${ID}'";
  }

  passBoardIDandNavigate() { 
    console.log("this.boradname:" + this.boardName);
    this.landingService.getBoardID(this.boardName).subscribe(
      (res) => { 
        this.boardId = res[0]["BoardID"];

        this.route.navigate(["board"], {queryParams: {boardId: this.boardId}});
      }
    )
  
  }

}
