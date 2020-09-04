import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuardService } from './guard/role.guard';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BodyHomepageComponent } from './components/body-homepage/body-homepage.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ArticleManagerTestComponent } from './components/article-manager-test/article-manager-test.component';
import { UserManagerTestComponent } from './components/user-manager-test/user-manager-test.component';
import { HomepageTestComponent } from './components/homepage-test/homepage-test.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'homepage',
    component: HomepageTestComponent,
    canActivate: [AuthGuard],
    // children: [
    //   { path: 'usermanager',
    //   component: UserManagerComponent,
    //   canActivate: [RoleGuardService],
    //   data: {
    //     expectedRole: 'admin'
    //   }
    // },
    // { path: 'articlemanager',
    //   component: ArticleManagerComponent,
    //   canActivate: [RoleGuardService],
    //   data: {
    //     expectedRole: 'admin'
    //   }
    // },
    // ]

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgetpassComponent
  },
  {
    path: 'user/reset-password',
    component: ResetpassComponent
  },
  {
    path: 'postBlog/:id',
    component: BlogPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'articleManager',
    component: ArticleManagerTestComponent,
    canActivate: [AuthGuard, RoleGuardService]
  },
  {
    path: 'userManager',
    component: UserManagerTestComponent,
    canActivate: [AuthGuard, RoleGuardService]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
