import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router: Router){

    }

    canActivate() {

        if(!localStorage.getItem('token')){

            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

}