import { Component, OnInit } from '@angular/core';
import { PositionsServerService } from '../applications/positions-server.service';
import { positions_list } from '../models/positions.model'
import { Subscription } from 'rxjs';
import { aboutDetails } from '../models/about-details.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-positions',
  templateUrl: './all-positions.component.html',
  styleUrls: ['./all-positions.component.css']
})
export class AllPositionsComponent implements OnInit {

  positions: positions_list[] = [];
  userDetails: aboutDetails[] = [];
  private positionsSub: Subscription;
  position_selected: boolean = false
  position_idx: number;
  participant_idx: number;
  participant_details: aboutDetails
  user_selected: boolean = false;

  constructor(private positionService: PositionsServerService,
    private router: Router, private route: ActivatedRoute) {}
  

  ngOnInit(): void {
    this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: positions_list[]) => {
      this.positions = positions
    })
  }

  show(idx: number) {
    this.position_selected = true
    this.position_idx = idx
    this.positionService.readPositionParticipants(this.positions[idx].position_name)
    .subscribe((transformedData) => {
      this.userDetails = transformedData
    })    
  }

  showParticipantDetails(idx: number, user: aboutDetails) {
    this.participant_idx = idx
    this.user_selected = true
    this.participant_details = user
  }
}

