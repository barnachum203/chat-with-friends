import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authSerivce: AuthService, private router: Router) {}

  canActivate() {
    return this.authSerivce.isLoggedIn().pipe(
      tap((userIsloggedIn) => {
        if (!userIsloggedIn) this.router.navigate(['/']);
      })
    );
  }
}
