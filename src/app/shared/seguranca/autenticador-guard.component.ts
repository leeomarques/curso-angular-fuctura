import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import Swal from 'sweetalert2';

@Injectable()
export class AutenticadorGuard implements CanActivate {

  constructor(
    private router: Router,
    private state: AppState) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.state.token && this.state.token.length > 5) {
      return true;
    } 

    Swal.fire(
      'Sessão Expirada',
      'Favor realizar novo Login.',
      'info'
    );

    this.router.navigate(['/login']);
    return false;
  }
}
