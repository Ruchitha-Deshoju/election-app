import { Component, OnInit } from '@angular/core';
import { PositionsServerService } from '../applications/positions-server.service';
import { applications_list } from '../models/applications.model';
import { Subscription } from 'rxjs';
import { aboutDetails } from '../models/about-details.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-positions',
  templateUrl: './all-positions.component.html',
  styleUrls: ['./all-positions.component.css']
})
export class AllPositionsComponent implements OnInit {

  positions: applications_list[] = [];
  userDetails: aboutDetails[] = [];
  private positionsSub: Subscription;
  selected: boolean = false
  curr_idx: number;

  constructor(private positionService: PositionsServerService,
    private router: Router, private route: ActivatedRoute) {}
  

  ngOnInit(): void {
    this.positions = this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: applications_list[]) => {
      this.positions = positions
    })
  }

  show(idx: number) {
    this.selected = true
    this.curr_idx = idx
    this.userDetails = this.positions[idx].position_participants;
  }

  showParticipantDetails(position_idx: number, participant_idx: number) {
    this.router.navigate([position_idx, participant_idx], {relativeTo: this.route})
  }

  // this.snapshotParam = this.route.snapshot.paramMap.get("animal");

  // // Subscribed
  // this.route.paramMap.subscribe(params => {
  //   this.subscribedParam = params.get("animal");
  // });



}
