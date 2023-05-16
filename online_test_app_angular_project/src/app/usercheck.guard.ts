import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsercheckGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.loginService.CheckUserSession() == true){
        if (this.router.url.length > 0) {
          let urlmap = route.url[0].path;
          if (urlmap=="welcome") {
            return true
          }
        }
      } else {
        alert("First you need to login..");
        this.router.navigate(['/login']);
        return false;
      }
    
      return true;
  }
  
}
