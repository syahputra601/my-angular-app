import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router'; // Untuk routing

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomesComponent } from './homes/homes.component';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field'; // Untuk form field Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    LoginComponent,
    HomesComponent,
    ErrorComponent,
    UserComponent,
    SuccessDialogComponent,
    EditUserComponent,
    UserListComponent,
    SearchComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule, // Untuk form field Angular Material
    MatInputModule, // Untuk input Angular Material
    MatAutocompleteModule, // Untuk autocomplete
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SuccessDialogComponent, UserModalComponent]
})
export class AppModule { }
