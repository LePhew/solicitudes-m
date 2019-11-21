import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'seleccionados', loadChildren: './seleccionados/seleccionados.module#SeleccionadosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
