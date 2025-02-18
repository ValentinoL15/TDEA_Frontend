import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesPreferencesPageRoutingModule } from './informes-preferences-routing.module';

import { InformesPreferencesPage } from './informes-preferences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformesPreferencesPageRoutingModule
  ],
  declarations: [InformesPreferencesPage]
})
export class InformesPreferencesPageModule {}
