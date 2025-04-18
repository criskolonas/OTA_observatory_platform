import { ApplicationConfig } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";
import {RecaptchaModule} from "ng-recaptcha";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideHttpClient(),MessageService,provideAnimations(),RecaptchaModule],
};
