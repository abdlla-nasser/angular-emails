import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { EmailPlaceHolderComponent } from './email-place-holder/email-place-holder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: InboxHomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService
        }
      },
      { path: '', component: EmailPlaceHolderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
