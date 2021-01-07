import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { positions_list } from "../models/positions.model"
import { aboutDetails } from '../models/about-details.model';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PositionsServerService {
  private positions: positions_list[] = [];
  private obj = {};

  // private positionsUpdated = new Subject<applications_list[]>();
  private newPositionsUpdated = new Subject<positions_list[]>()

  constructor(private http: HttpClient) { }

  getPositions() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/positions')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          id: post._id, 
          position_name: post.positions
        };
      })
    }))
    .subscribe((transformedPosts) => {
      this.positions = transformedPosts
      this.newPositionsUpdated.next([...this.positions])
    })
  }

  getPositionsUpdatedListener() {
    return this.newPositionsUpdated.asObservable();
  }

  createPosition(post_name: String) {
    this.obj = {
      positions: post_name
    }
    this.http.post('http://localhost:3000/positions', this.obj)
    .subscribe((responseData) => {
      console.log(responseData)
    })
  }

  addParticipant(index: number, user: aboutDetails) {
    this.obj = {
        "position_name": this.positions[index].position_name,
        "participants_details": {
            "participant_name": user.participant_name,
            "email": user.email,
            "about": user.about,
            "myPromises": user.myPromises,
            "myAchivements": user.myAchivements,
            "mySupportes": user.mySupportes
        }
    }
    this.http.post('http://localhost:3000/participant/', this.obj).subscribe((responseData) => {
      console.log(responseData)
    })
  }

  readPositionParticipants(position: String) {
    return this.http.get<{ message: string, details: any, position_id: string}>('http://localhost:3000/participant/' + position)
    .pipe(map((response) => {
      return response.details.map(data => {
        return {
          id: data._id, 
          participant_name: data.participant_name,
          email: data.email, 
          about: data.about, 
          myPromises: data.myPromises,
          myAchivements: data.myAchivements, 
          mySupportes: data.mySupportes
        };
      })
    }))
  }

  getPositonId(name: String) {
    return this.http.get<{position_id: string}>('http://localhost:3000/participant/'+ name)
  }

  getParticipantDetails(position_id: String, participant_id: String) {
    return this.http.get('http://localhost:3000/participant/'+ position_id + '/' + participant_id)
  }

}


