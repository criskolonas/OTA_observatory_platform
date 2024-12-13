import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes, routerConfig } from './app.routes'; // Adjust the import path if necessary

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
