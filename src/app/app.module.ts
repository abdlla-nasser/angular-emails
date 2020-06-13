import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHTTPInterceptor } from './auth/auth-httpinterceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHTTPInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
