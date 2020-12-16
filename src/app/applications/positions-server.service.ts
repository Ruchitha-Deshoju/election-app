import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { applications_list } from '../models/applications.model';
import { aboutDetails } from '../models/about-details.model' 
@Injectable({
  providedIn: 'root'
})

export class PositionsServerService {
  private positions: applications_list[] = [];
  private obj = {};

  private positionsUpdated = new Subject<applications_list[]>();

  constructor() { }

  getPositions() {
    return [...this.positions]
  }

  getPositionsUpdatedListener() {
    return this.positionsUpdated.asObservable();
  }

  createPosition(post_name: String) {
    const newPost:  applications_list = {position_name: post_name, position_participants: []};
    this.positions.push(newPost)
    this.positionsUpdated.next([...this.positions])
  }

  addParticipant(index: number, user: aboutDetails) {

    this.obj["participant_name"] = user.participant_name;
    this.obj["email"] = user.email;
    this.obj["about"] = user.about;
    this.obj["supporters"] = user.supporters;
    this.obj["promises"] = user.promises;
    this.obj["achivements"] = user.achivements;
    this.positions[index].position_participants.push(this.obj);
    this.positionsUpdated.next([...this.positions])
    this.obj = {}
  }

}


