import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../core/auth.service';


import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthGuardService implements CanActivate {
  private isAuthenticatedSource = new BehaviorSubject<any>(false);
  isAuthenticated = this.isAuthenticatedSource.asObservable().distinctUntilChanged();
  changeIsAuthenticated(isAuthenticated:any){
    this.isAuthenticatedSource.next(isAuthenticated);
  }

  constructor(private router: Router, private authService:AuthService) {
    this.changeIsAuthenticated(this.authService.isAuthenticated());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticatedSource; 
  }

}