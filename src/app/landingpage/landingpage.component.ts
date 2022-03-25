import { Component, OnInit } from '@angular/core';
import { join } from 'path';

join(); {
  let ID = document.getElementById("boardID")!;
  let rm = ID?.innerText;
  console.log("TEST");
  //document.getElementById("JOIN").onclick = "location.href='//localhost:4200/${ID}'";
}

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
