import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthorizationAuthenticationGuard } from './guards/authorization-authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'food',
    pathMatch: 'full'
  },
  {
    path: 'food',
    canActivate: [AuthorizationAuthenticationGuard],
    loadChildren: () => import('./food/food.module').then( m => m.FoodPageModule)
  },
  {
    path: 'auth/login',
    loadChildren: () => import('./auth-login/auth-login.module').then( m => m.AuthLoginPageModule)
  },
  {
    path: 'auth/register',
    loadChildren: () => import('./auth-register/auth-register.module').then( m => m.AuthRegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
