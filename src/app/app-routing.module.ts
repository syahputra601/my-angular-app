import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomesComponent } from './homes/homes.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchComponent } from './search/search.component';
import { MyComponentComponent } from './about/features/my-component.component';
import { BarangComponent } from './barang/barang.component';
import { MasukComponent } from './masuk/masuk.component';

import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent, //default route
    pathMatch: 'full'
  },
  { path: 'about',
    component: AboutComponent //about route
  },
  { path: 'profile',
    component: ProfileComponent //profile route
  },
  { path: 'login',
    component: LoginComponent //profile route
  },
  { path: 'homes',
    component: HomesComponent //profile route
  },
  { path: 'user',
    component: UserComponent //profile route
  },
  { path: 'edit-user/:user_id',
    component: EditUserComponent //profile route
  },
  {
    path: 'delete-user/:user_id',
    component: EditUserComponent
  },
  { path: 'user-list',
    component: UserListComponent //profile route
  },
  { path: 'search',
    component: SearchComponent //profile route
  },
  // { path: 'app-my-component',
  //   component: MyComponentComponent //profile route
  // },
  { path: 'barang',
    component: BarangComponent //profile route
  },
  { path: 'masuk',
    component: MasukComponent //profile route
  },
  {
    path: '**',
    component: ErrorComponent //redirect jika route tidak ditemukan
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
