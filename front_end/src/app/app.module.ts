import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventsComponent } from './components/events/events.component';
import { SpecialEventsComponent } from './components/special-events/special-events.component';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NavigateComponent } from './components/navigate/navigate.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalCreatePostsComponent } from './components/modal-create-posts/modal-create-posts.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BodyHomepageComponent } from './components/body-homepage/body-homepage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    HomeComponent,
    NavigateComponent,
    NavbarComponent,
    FooterComponent,
    ArticlesComponent,
    SidebarComponent,
    ModalCreatePostsComponent,
    BlogPostComponent,
    BodyHomepageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,


    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, EventService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
