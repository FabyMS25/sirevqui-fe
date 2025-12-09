import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { AuthenticationService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authenticationService.currentUser();
    if (!currentUser) {
      this.authenticationService.logout();
      return false;
    }
    const hasPermission = this.checkPermissions(route, state);
    if (!hasPermission) {
      this.router.navigate(['/']);
    }
    return hasPermission;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(childRoute, state);
  }

  private checkPermissions(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url === "/" || state.url === "") {
      return true;
    }

    let currentRoute: ActivatedRouteSnapshot | null = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const requiredPermission =
      currentRoute.data["requiredPermission"] || currentRoute.data["permission"];

    if (requiredPermission) {
      return (
        requiredPermission === "CAN_ACCESS" ||
        this.authenticationService.hasRoutePermission(requiredPermission)
      );
    }

    const baseUrl = state.url.split("?")[0].split("/").slice(0, 3).join("/");
    return this.authenticationService.hasRoutePermission(baseUrl);
  }
}
