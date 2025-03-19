import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixturePageRoutingModule } from './fixture-routing.module';

import { FixturePage } from './fixture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixturePageRoutingModule
  ],
  declarations: [FixturePage]
})
export class FixturePageModule {}
