import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { applications_list } from '../../models/applications.model';
import { Subscription } from 'rxjs';
import { PositionsServerService } from '../../applications/positions-server.service';


@Component({
  selector: 'app-positions-participants',
  templateUrl: './positions-participants.component.html',
  styleUrls: ['./positions-participants.component.css']
})
export class PositionsParticipantsComponent implements OnInit {

  positions: applications_list[] = [];
  private positionsSub: Subscription;
  position: any;
  participant: any;
  Details: boolean = false;



  constructor(private route: ActivatedRoute, private positionService: PositionsServerService) { }

  ngOnInit(): void {

    this.positions = this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: applications_list[]) => {
      this.positions = positions
    })
    this.position = this.positions[+this.route.snapshot.params['position_idx']];
    this.participant = this.position.position_participants[+this.route.snapshot.params['participant_idx']];
    this.route.params.subscribe((params: Params) => {
      this.position = this.positions[+params['position_idx']];
      this.participant = this.position.position_participants[+params['participant_idx']];
  })

  // console.log(this.position, this.participant)
  console.log(this.positions)
  this.Details = true;
  }

  // keys() : Array<string> {
  //   return Object.keys(this.myDict);
  // }

  keys() : Array<string> {
    return Object.keys(this.participant)
  }
 

  }






