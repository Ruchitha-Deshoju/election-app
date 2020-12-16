import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PositionsServerService } from '../positions-server.service';
import { applications_list } from '../../models/applications.model';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  @ViewChild('f', { static: false }) addPositionNames: NgForm;

  positions: applications_list[] = [];
  private positionsSub: Subscription;
  selected_index: number;
  supporter_name: string = '';
  promises: string = '';
  achivements: string = '';
  supporters_list: string[] = [];
  achivements_list: string[] = [];
  promises_list: string[] = [];
  about: string = '';
  user = {
    participant_name: '',
    email: '',
    about: '',
    supporters: [],
    promises: [],
    achivements: []
  }

  constructor(public positionService: PositionsServerService ) { }

  ngOnInit(): void {
    this.positions = this.positionService.getPositions();
    this.positionsSub = this.positionService.getPositionsUpdatedListener()
    .subscribe((positions: applications_list[]) => {
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
    this.user.achivements = [...this.achivements_list]
    this.user.supporters = [...this.supporters_list]
    this.user.promises = [...this.promises_list]
    this.positionService.addParticipant(this.selected_index, this.user)
    this.addPositionNames.reset();

    this.achivements_list = []
    this.promises_list = []
    this.supporters_list = []
  }
}

