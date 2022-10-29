import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lms-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  clicked(e: any) {
    console.log(e)
  }

}
