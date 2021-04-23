import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { WildcardComponent } from './wildcard/wildcard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGuard]
  },
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule),
  },
  {

    path: 'profile',
    loadChildren:()=> import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {

    path: 'task',
    loadChildren:()=> import('./task/task.module').then(m => m.TaskModule),
    canActivate: [AuthGuard]
    
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path: '**',
    component: WildcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
