import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { EmailModule } from '../email/emial.module';
import { EmployeeModule } from '../employee/employee.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ZoomImageDirective } from './zoom-image.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailsComponent } from './details/details.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'details/:id',
        component: DetailsComponent,
      }
    ]
  }

]


@NgModule({
  declarations: [
    HomeComponent,
    ImagePreviewComponent,
    ErrorDialogComponent,
    ZoomImageDirective,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    EmailModule,
    EmployeeModule,
    NgxImageZoomModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    ImagePreviewComponent,
    ErrorDialogComponent
  ],
})
export class HomeModule { }
