import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyUsersPageRoutingModule } from './my-users-routing.module';

import { MyUsersPage } from './my-users.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyUsersPageRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  declarations: [MyUsersPage]
})
export class MyUsersPageModule {}
