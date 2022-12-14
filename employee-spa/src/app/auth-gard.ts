import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

export class AuthGuard implements CanActivate {
    /**
     *
     */
    constructor(private router: Router) {

    }
    canActivate() {
        var token = localStorage.getItem('token')
        if (token)
            return true;
        this.router.navigate(['auth']);
        return false;
    }
}