import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
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
import { ArticleManagerComponent } from './components/article-manager/article-manager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuocariclesComponent } from './components/quocaricles/quocaricles.component';
import { PostdetailComponent } from './components/postdetail/postdetail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestUserManagerComponent } from './components/test-user-manager/test-user-manager.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    UserManagerComponent,
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
    ArticleManagerComponent,
    NotfoundComponent,
    ForgetpassComponent,
    ResetpassComponent,
    PageNotFoundComponent,
    QuocariclesComponent,
    PostdetailComponent,
    TestUserManagerComponent,
    DialogUserComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    NgbModule,
  ],
  providers: [AuthService, EventService, AuthGuard, ArticlesComponent,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogUserComponent]
})
export class AppModule { }
