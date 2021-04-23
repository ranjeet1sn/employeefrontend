import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
const routes:Routes=[
  {
    path:'',
    component:ProfileComponent
  }
]


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    MatIconModule
  ],
  providers:[
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class ProfileModule { }
