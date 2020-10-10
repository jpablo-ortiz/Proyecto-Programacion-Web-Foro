import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForoViewComponent } from './foro/foro-view/foro-view.component';
import { ForoListComponent } from './foro/foro-list/foro-list.component';
import { TemaViewComponent } from './foro/tema/tema-view/tema-view.component';
import { LoginComponent } from './login/login.component';
import { TemaCreateComponent } from './foro/tema/tema-create/tema-create.component';

const routes: Routes = [
  { path: 'foro/foro-view/:id', component: ForoViewComponent },
  { path: 'foro/foro-list', component: ForoListComponent },
  { path: 'foro/tema/tema-view/:id', component: TemaViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'foro/tema/tema-create/:id', component: TemaCreateComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
