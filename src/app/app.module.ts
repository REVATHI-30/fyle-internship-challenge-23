import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
import { CacheInterceptor } from './cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
