import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './components/article-manager/article-manager.component'

const routes: Routes = [
  { path: 'articlemanager', component: ArticleManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
