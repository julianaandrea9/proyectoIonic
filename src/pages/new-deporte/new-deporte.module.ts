import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDeportePage } from './new-deporte';

@NgModule({
  declarations: [
    NewDeportePage,
  ],
  imports: [
    IonicPageModule.forChild(NewDeportePage),
  ],
})
export class NewDeportePageModule {}
