import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthGuard} from './helpers/auth.guard';
import {UserComponent} from './pages/user/user.component';

const routers: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'user', component: UserComponent},
  {path: 'profile',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        m => m.ProfileModule
      )
  },
] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
