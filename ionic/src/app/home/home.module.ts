import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { NgxPaginationModule } from 'ngx-pagination'
import { HomePage } from './home.page';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    JoyrideModule.forChild(),
    NgxPaginationModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
