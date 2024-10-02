import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdminPageRoutingModule } from './create-admin-routing.module';

import { CreateAdminPage } from './create-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdminPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateAdminPage]
})
export class CreateAdminPageModule {}
