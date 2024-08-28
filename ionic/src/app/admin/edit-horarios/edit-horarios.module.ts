import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHorariosPageRoutingModule } from './edit-horarios-routing.module';

import { EditHorariosPage } from './edit-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHorariosPageRoutingModule
  ],
  declarations: [EditHorariosPage]
})
export class EditHorariosPageModule {}
