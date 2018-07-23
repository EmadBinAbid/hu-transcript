import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatDialogModule, MatSnackBarModule, MatMenuModule, MatTooltipModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatTableModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LeadershipComponent } from './components/category/leadership/leadership.component';
import { ClubComponent } from './components/category/club/club.component';
import { DevComponent } from './components/category/dev/dev.component';
import { WellnessComponent } from './components/category/wellness/wellness.component';
import { CampusComponent } from './components/category/campus/campus.component';
import { CommunityComponent } from './components/category/community/community.component';
import { GlobalComponent } from './components/category/global/global.component';
import { AcademicComponent } from './components/category/academic/academic.component';
import { OfficialComponent } from './components/category/official/official.component';
import { PeerComponent } from './components/category/peer/peer.component';
import { AthleticsComponent } from './components/category/athletics/athletics.component';
import { CreativeComponent } from './components/category/creative/creative.component';
import { AwardComponent } from './components/category/award/award.component';
import { OtherComponent } from './components/category/other/other.component';
import { DetailsComponent } from './components/details/details.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    DashboardComponent,
    LeadershipComponent,
    ClubComponent,
    DevComponent,
    WellnessComponent,
    CampusComponent,
    CommunityComponent,
    GlobalComponent,
    AcademicComponent,
    OfficialComponent,
    PeerComponent,
    AthleticsComponent,
    CreativeComponent,
    AwardComponent,
    OtherComponent,
    DetailsComponent,
    SupervisorComponent,
    AdminDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
