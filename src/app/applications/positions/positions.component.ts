import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PositionsServerService } from '../positions-server.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  @ViewChild ('f', {static: true}) PositionForm: NgForm;
  constructor(public positionService: PositionsServerService) { }

  ngOnInit(): void {}

  onSubmit() {
    this.positionService.createPosition(this.PositionForm.value.positionName)
    this.PositionForm.reset()
  }


}
