import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponentComponent } from './features/my-component.component';



@NgModule({
  declarations: [MyComponentComponent],
  imports: [
    CommonModule,
  ]
})
export class AboutModule { }
