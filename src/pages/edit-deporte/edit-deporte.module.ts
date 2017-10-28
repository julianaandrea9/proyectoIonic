import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDeportePage } from './edit-deporte';

@NgModule({
  declarations: [
    EditDeportePage,
  ],
  imports: [
    IonicPageModule.forChild(EditDeportePage),
  ],
})
export class EditDeportePageModule {}
