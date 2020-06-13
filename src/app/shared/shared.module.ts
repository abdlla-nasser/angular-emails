import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { FormModalComponent } from './form-modal/form-modal.component';



@NgModule({
  declarations: [
    InputComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent, FormModalComponent]
})
export class SharedModule { }
