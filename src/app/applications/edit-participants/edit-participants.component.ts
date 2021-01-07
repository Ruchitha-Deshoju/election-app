import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PositionsServerService } from '../positions-server.service';
import { positions_list } from '../../models/positions.model';
import { aboutDetails } from 'src/app/models/about-details.model';

@Component({
  selector: 'app-edit-participants',
  templateUrl: './edit-participants.component.html',
  styleUrls: ['./edit-participants.component.css']
})
export class EditParticipantsComponent implements OnInit {

  positions: positions_list[] = [];
  userDetails: aboutDetails[] = [];
  private positionsSub: Subscription;  
  position_id: String;
  participant_id: String;
  participant_details: aboutDetails

  constructor(public positionService: PositionsServerService) { }

  ngOnInit(): void {
    this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: positions_list[]) => {
      this.positions = positions
    })
  }

  changePosition(idx: number) {
    this.positionService.readPositionParticipants(this.positions[idx].position_name)
    .subscribe((transformedData) => {
      this.userDetails = transformedData
    })
    this.positionService.getPositonId(this.positions[idx].position_name).subscribe(response => {
      this.position_id = response.position_id
    })  
  }

  changeParticipant(idx: number) {
    this.participant_id = this.userDetails[idx].id
  }
  
}
