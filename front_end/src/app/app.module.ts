import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalCreatePostsComponent } from './components/modal-create-posts/modal-create-posts.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BodyHomepageComponent } from './components/body-homepage/body-homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { EventsComponent } from './components/events/events.component';
// import { SpecialEventsComponent } from './components/special-events/special-events.component';
// import { AuthService } from './auth.service';
// import { EventService } from './event.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ArticlesComponent,
    SidebarComponent,
    ModalCreatePostsComponent,
    BlogPostComponent,
    BodyHomepageComponent,
    PageNotFoundComponent,


    // LoginComponent,
    // RegisterComponent,
    // EventsComponent,
    // SpecialEventsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,


    FormsModule,
    HttpClientModule
  ],
  // providers: [AuthService, EventService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
