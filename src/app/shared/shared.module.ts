import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { ShortPipe } from './pipes/short.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { TaskDetailComponent } from './task/task.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatusBoxComponent } from './status-box/status-box.component';
import {ToastrModule } from 'ngx-toastr';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    AddTaskComponent,
    ShortPipe,
    TaskDetailComponent,
    SidebarComponent,
    StatusBoxComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    DragDropModule
  ],
  entryComponents:[
    AddTaskComponent,
    TaskDetailComponent,
    StatusBoxComponent
  ],
 exports:[
   ShortPipe,
   SidebarComponent,
 ],

})
export class SharedModule { }
