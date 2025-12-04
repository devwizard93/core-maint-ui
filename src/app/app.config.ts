import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configura las rutas de la app
    provideHttpClient(withInterceptors([authInterceptor])),// Habilita el uso de HttpClient para llamadas HTTP
    importProvidersFrom(FormsModule),// Habilita formularios template-driven
    importProvidersFrom(BrowserAnimationsModule)// Necesario si usas animaciones (ej: Angular Material)
  ]
};
