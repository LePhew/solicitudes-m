import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'seleccionados', loadChildren: './seleccionados/seleccionados.module#SeleccionadosPageModule' },
  { path: 'ver-solicitudes', loadChildren: './ver-solicitudes/ver-solicitudes.module#VerSolicitudesPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' }



];

/*
const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
];
*/

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
