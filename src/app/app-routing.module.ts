import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
  {path: 'list', component: AppComponent },
  {path: 'add', component: AddComponent },
  {path: 'edit', component: EditComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
