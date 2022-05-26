import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-title',
  templateUrl: './title.page.html',
  styleUrls: ['./title.page.scss'],
})
export class TitlePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToHome(params){
    if (!params) params = {};
    this.route.navigate(['home']);
  }
}
