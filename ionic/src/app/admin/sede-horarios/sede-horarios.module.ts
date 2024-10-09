import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SedeHorariosPageRoutingModule } from './sede-horarios-routing.module';

import { SedeHorariosPage } from './sede-horarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SedeHorariosPageRoutingModule
  ],
  declarations: [SedeHorariosPage]
})
export class SedeHorariosPageModule {}
