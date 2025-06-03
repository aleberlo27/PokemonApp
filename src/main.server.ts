import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);
//PARA PODER HACER PETICIONES HTTP CON SSR
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export default bootstrap;
