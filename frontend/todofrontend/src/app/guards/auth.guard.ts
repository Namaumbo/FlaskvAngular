

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { LoginComponent } from "../components/login/login.component";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public user: UserService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // console.log(route)
    if (route.component == LoginComponent) {
      localStorage.setItem('token', '')
      this.router.navigate([''])
      return false
    }
    if (this.user.isLoggedIn()) {
      return true
    }
    else {
      this.router.navigate([''])
      return false
    }

  }

}
