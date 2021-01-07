import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplicationsComponent } from './applications/applications.component';
import { PositionsComponent } from './applications/positions/positions.component';
import { ParticipantsComponent } from './applications/participants/participants.component';
import { FormsModule } from '@angular/forms';
import { AllPositionsComponent } from './all-positions/all-positions.component';
import { PositionsParticipantsComponent } from './all-positions/positions-participants/positions-participants.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditParticipantsComponent } from './applications/edit-participants/edit-participants.component';
import { DeleteParticipantsComponent } from './applications/delete-participants/delete-participants.component'
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'applications', component: ApplicationsComponent,
          children: [
            {path: 'addPositions', component: PositionsComponent},
            {path: 'participants', component: ParticipantsComponent},
            {path: 'editParticipant', component: EditParticipantsComponent},
            {path: 'deleteParticipant', component: DeleteParticipantsComponent}
          ]},
  { path: 'allpositions', component: AllPositionsComponent,
          // children: [
          //   { path: ':position_idx/:participant_idx', component: PositionsParticipantsComponent}
          // ]
  },
  {path: 'edit/:position/:name', component: ParticipantsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    PositionsComponent,
    ParticipantsComponent,
    AllPositionsComponent,
    PositionsParticipantsComponent,
    HomePageComponent,
    EditParticipantsComponent,
    DeleteParticipantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
