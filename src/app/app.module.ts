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


const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'applications', component: ApplicationsComponent,
          children: [
            {path: 'addPositions', component: PositionsComponent},
            {path: 'participants', component: ParticipantsComponent},
            {path: 'editParticipant', component: EditParticipantsComponent}
          ]},
  { path: 'allpositions', component: AllPositionsComponent,
          children: [
            { path: ':position_idx/:participant_idx', component: PositionsParticipantsComponent}
          ]},
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }