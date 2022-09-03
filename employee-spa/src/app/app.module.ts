import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AuthGard } from './auth-gard';
import { JWTInterceptor } from './jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [AuthGard,

    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
