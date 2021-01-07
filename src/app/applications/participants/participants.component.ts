import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PositionsServerService } from '../positions-server.service';
import { positions_list } from '../../models/positions.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { aboutDetails } from '../../models/about-details.model'
import { ConnectionStates } from 'mongoose';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  @ViewChild('f', { static: false }) addPositionNames: NgForm;

  positions: positions_list[] = [];
  participant: aboutDetails;
  private positionsSub: Subscription;
  private mode = 'create';
  private position_id: String;
  private participant_id: String;
  selected_index: number;

  supporter_name: string = '';
  supporters_list: string[] = [];

  promises: string = '';
  promises_list: string[] = [];

  achivements: string = '';
  achivements_list: string[] = [];

  about: string = '';

  user = {
    participant_name: '',
    email: '',
    about: '',
    mySupportes: [],
    myPromises: [],
    myAchivements: [],
    id: null,
  }

  constructor(public positionService: PositionsServerService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('position')) {
        this.mode = 'edit'
        this.position_id = paramMap.get('position')
        this.participant_id = paramMap.get('name')
        this.positionService.getParticipantDetails(this.position_id, this.participant_id).subscribe(responseData => {
          const userList = Object.keys(responseData)
          const userDetails = responseData
          this.participant = { 
            id: userDetails["_id"], 
            participant_name: userDetails["participant_name"], 
            email: userDetails["email"], 
            about: userDetails["about"], 
            myPromises: userDetails["myPromises"], 
            myAchivements: userDetails["myAchivements"],
            mySupportes: userDetails["mySupportes"]
          }
          // console.log(this.participant)
          // console.log(userDetails)
          // console.log(userDetails)
          // console.log(userDetails["_id"])
        })
      } else {
        this.mode = 'create'
        this.position_id = null
      }
    })

    this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: positions_list[]) => {
      this.positions = positions
    })
  }

  addSupporter() {
    if(this.supporter_name !== "") {
      this.supporters_list.push(this.supporter_name);
      this.supporter_name = ''
    }
  }

  addPromise() {
    if(this.promises !== "") {
      this.promises_list.push(this.promises)
      this.promises = ''
    }
  }

  addAchivement() {
    if(this.achivements !== "") {
      this.achivements_list.push(this.achivements)
      this.achivements = ''
    }
  }


  onSubmit() {
    this.selected_index = this.addPositionNames.value.selectPosition
    this.user.participant_name = this.addPositionNames.value.participant_name;
    this.user.email = this.addPositionNames.value.email;
    this.user.about = this.addPositionNames.value.about;
    this.user.myAchivements = [...this.achivements_list]
    this.user.mySupportes = [...this.supporters_list]
    this.user.myPromises = [...this.promises_list]
    this.positionService.addParticipant(this.selected_index, this.user)
    this.addPositionNames.reset();

    this.achivements_list = []
    this.promises_list = []
    this.supporters_list = []
  }
}


