import { BoardPageComponent } from './pages/board-page/board-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", component: LandingpageComponent},
  {path: "01", component: BoardPageComponent},
  {path: "02", component: BoardPageComponent},
  {path: "03", component: BoardPageComponent},
  {path: "04", component: BoardPageComponent},
  {path: "05", component: BoardPageComponent},
  {path: "06", component: BoardPageComponent},
  {path: "07", component: BoardPageComponent},
  {path: "08", component: BoardPageComponent},
  {path: "09", component: BoardPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
