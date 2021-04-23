import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
// import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    NgbCollapseModule,
    MatMenuModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
