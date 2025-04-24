import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'edit-account',
        component: EditAccountComponent
    },
    {
        path: '**',
        redirectTo: '',
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    },
];
