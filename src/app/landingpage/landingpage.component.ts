import { Component, OnInit } from '@angular/core';

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
function Join_Room() {
  let el = document.getElementById("boardID")!;
  var ID = document.getElementById("ID");
  let rm = ID?.innerText;
  console.log("TEST");
  //document.getElementById("JOIN").onclick = "location.href='//localhost:4200/${ID}'";
}
