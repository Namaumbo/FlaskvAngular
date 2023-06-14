import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompletelistComponent } from './completelist/completelist.component';
import { UncompleteComponent } from './uncomplete/uncomplete.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'completed',
    component: CompletelistComponent,
    canActivate:[AuthGuard]

  }, {
    path: 'uncompleted',
    component: UncompleteComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    component : NotfoundComponent,
    canActivate:[AuthGuard]
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
