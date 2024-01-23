import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        this.toastr.error('You shall not pass');
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
