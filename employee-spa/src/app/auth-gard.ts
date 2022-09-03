import { CanActivate } from "@angular/router";

export class AuthGard implements CanActivate {
    canActivate() {
        var token = localStorage.getItem('token')
        if (token)
            return true;
        return false;
    }
}