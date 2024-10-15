import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MyComponentComponent } from "./features/my-component.component";

const routes: Routes = [
  {
    path: "features",
    component: MyComponentComponent,
    data: {
      name: "About / Features",
      reset: true,
    },
  },
  {
    path: "appointed-unit",
    component: MyComponentComponent,
    data: {
      name: "Allocated Units",
    },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class AboutRoutingModule { }
