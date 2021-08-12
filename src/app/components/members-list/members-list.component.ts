import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  users: string[] = ["fake-person1", "fake-person2", "fake-person3"]
  constructor() { }

  ngOnInit(): void {
  }

}
