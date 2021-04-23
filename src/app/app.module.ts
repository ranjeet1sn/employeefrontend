import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { PostService } from './shared/services/post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptor } from './shared/interceptor/header.interceptor';
import { WildcardComponent } from './wildcard/wildcard.component';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileService } from './shared/services/profile.service';
import { TaskService } from './shared/services/task.service';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    WildcardComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    MatDividerModule,
    MatCardModule,
    SharedModule,
    GoogleChartsModule,
    NgxSpinnerModule
  ],
  providers: [
    PostService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    },
    SocketService,
    AuthService,
    ProfileService,
    TaskService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
