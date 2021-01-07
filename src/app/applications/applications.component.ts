import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {}

  positionBtn() {
    this.router.navigate(['addPositions'], { relativeTo: this.route})
  }

  participants() {
    this.router.navigate(['participants'], { relativeTo: this.route})
  }

  editParticipants() {
    this.router.navigate(['editParticipant'], {relativeTo: this.route})
  }
  deleteParticipants() {
    // this.router.navigate(['deleteParticipant'], {relativeTo: this.route})
  }

}
