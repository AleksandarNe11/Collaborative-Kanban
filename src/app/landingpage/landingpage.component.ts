import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, ObservableLike } from 'rxjs';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  boardIdObservable$: Observable<ParamMap>;
  boardId: number; 

  ngOnInit(): void {
  }

  join() {
    let ID = document.getElementById("boardID");
    let rm = ID?.innerText;
    console.log("TEST");
    //document.getElementById("JOIN").onclick = "location.href='//localhost:4200/${ID}'";
  }

  passBoardIDandNavigate() { 
    // this.boardIdObservable$ = this.route.paramMap.pipe(
    //   switchMap(params => { 
    //     this.boardId = Number(params.get('boardId'))
    //   })
    // )
  }
  

}
