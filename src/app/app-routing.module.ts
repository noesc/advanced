import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {InternalServerComponent} from './error-pages/internal-server/internal-server.component'
const routes: Routes = [
  { path:'', component:UserListComponent },
  { path:'user/create', component:UserDetailComponent },
  { path:'user/edit/:id', component:UserDetailComponent },
  { path: '500', component: InternalServerComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
