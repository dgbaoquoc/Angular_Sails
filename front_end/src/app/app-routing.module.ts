import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EventsComponent } from './components/events/events.component';
// import { SpecialEventsComponent } from './components/special-events/special-events.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BodyHomepageComponent } from './components/body-homepage/body-homepage.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'events',
  //   component: EventsComponent
  // },
  // {
  //   path: 'special',
  //   component: SpecialEventsComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  {
    path: '', redirectTo: '/homepage', pathMatch: 'full'
  },
  {
    path: 'homepage', component: BodyHomepageComponent
  },
  {
    path: 'postBlog/:id', component: BlogPostComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
