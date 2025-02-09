import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { FunctionCollectionComponent } from './app/function-collect-amount/function-collect-amount.component';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'function-collect-amount', component: FunctionCollectionComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
