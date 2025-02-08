import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FunctionCollectionComponent } from './function-collect-amount/function-collect-amount.component';

const routes = [
  { path: '', component: FunctionCollectionComponent } // Add your component to the routes
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};
