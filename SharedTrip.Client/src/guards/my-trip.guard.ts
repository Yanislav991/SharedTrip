import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyTripGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }
  isOwner?: boolean
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let id = route.paramMap.get('id');
    await this.auth.isOwner(id).then(s => {
      this.isOwner = s.isOwner;
    });

    if (this.auth.getToken() == '') {
      this.router.navigate(['/login'])
      return false;
    } else if (this.isOwner == false) {
      alert("You are not allowed to edit this Trip since you're not its creator!")
      this.router.navigate(['/trips/all'])
      return false;
    } else {
      return true;
    }
  }

}
