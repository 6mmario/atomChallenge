import { Routes } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";

export const routes: Routes = [
    //{
    //    path: "",
    //    redirectTo: "/home",
    //    pathMatch: "full"
    //},
    {
        path: "",
        redirectTo:"/login",
        pathMatch: "full"
    },
    {
        path: "dashboards",
        component: DashboardComponent
    },
    {
        path: "login",
        loadComponent: () => import("./component/login/login.component").then((m) => m.LoginComponent)

    }
];
