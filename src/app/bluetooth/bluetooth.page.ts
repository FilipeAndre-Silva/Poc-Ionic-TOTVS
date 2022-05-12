import { Component, OnInit } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  teeth: any;
  constructor(private ble: BLE) {}
  // constructor() {}

  ngOnInit() {
  }

  scan(){
    this.ble.scan([], 5).subscribe(device => {    
      this.teeth = device;
      console.log(JSON.stringify(device));
    });
  }

}
