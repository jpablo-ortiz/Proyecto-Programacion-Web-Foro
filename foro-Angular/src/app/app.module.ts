import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForoViewComponent } from './foro/foro-view/foro-view.component';
import { ForoListComponent } from './foro/foro-list/foro-list.component';
import { TemaViewComponent } from './foro/tema/tema-view/tema-view.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MatSliderModule } from '@angular/material/slider';
import { TemaCreateComponent } from './foro/tema/tema-create/tema-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ForoViewComponent,
    ForoListComponent,
    TemaViewComponent,
    LoginComponent,
    TemaCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,


    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,


    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
