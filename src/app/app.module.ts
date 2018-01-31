import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from './material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { PointNetworkDirective } from './point-network.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    PointNetworkDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
