import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PositionsServerService } from '../positions-server.service';
import { applications_list } from '../../models/applications.model';
import { aboutDetails } from 'src/app/models/about-details.model';

@Component({
  selector: 'app-edit-participants',
  templateUrl: './edit-participants.component.html',
  styleUrls: ['./edit-participants.component.css']
})
export class EditParticipantsComponent implements OnInit {

  positions: applications_list[] = [];
  participants: aboutDetails[] = [];
  private positionsSub: Subscription;  

  constructor(public positionService: PositionsServerService) { }

  ngOnInit(): void {
    this.positions = this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: applications_list[]) => {
      this.positions = positions
    })
  }

  changePosition(idx: number) {
    this.participants = this.positions[idx].position_participants;
  }

  changeParticipant(idx: number) {
    console.log(this.participants[idx].participant_name)
  }
}
