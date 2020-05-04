import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
  images = ["z7p2RZp", "gVSMKoD", "vNzzhhz"].map((n) => `https://i.imgur.com/${n}.jpg`);
  constructor() { }

  ngOnInit(): void {
  }

}
