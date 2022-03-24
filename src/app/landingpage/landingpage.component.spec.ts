import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage.component';

/*
class Test {
  constructor() {
    let btn = document.getElementById("JOIN")!;
    let el = document.getElementById("boardID")!;
    let rm = el.innerText;
    btn.addEventListener("click", (e:Event) => this.Create_Room(rm));
  }
  Create_Room(rm:string){
     RouterModule.
  }
}

new Test();
*/

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function Join_Room() {
  let el = document.getElementById("boardID")!;
  var ID = document.getElementById("ID");
  let rm = ID?.innerText;
  console.log("TEST");
  //document.getElementById("JOIN").onclick = "location.href='//localhost:4200/${ID}'";
}

