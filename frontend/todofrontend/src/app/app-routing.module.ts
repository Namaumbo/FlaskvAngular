import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompletelistComponent } from './completelist/completelist.component';
import { UncompleteComponent } from './uncomplete/uncomplete.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path : '',
    component : HomeComponent
},{
  path:'completed',
  component : CompletelistComponent

  },{
    path:'uncompleted',
    component: UncompleteComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'logout',
    component:LoginComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
