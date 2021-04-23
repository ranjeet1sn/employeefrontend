import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes:Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'reset-link',
    component:ResetEmailComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetEmailComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, 
    FormsModule,
    MatIconModule,
    MatCardModule,
    ToastrModule.forRoot()
  ],
  providers:[
    {provide: ToastrService, useClass: ToastrService}
  ]
})
export class AuthModule { }
