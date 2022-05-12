import { Component, OnInit, NgZone } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  teeth: any;
  devices: any[] = [];
  msgBack = "Iniciou";
  tempo = 30;
  
  constructor(private ble: BLE, private ngZone: NgZone) {}

  ngOnInit() {
  }

  Scan(){
    setTimeout(this.myGreeting(), 1000);
    this.devices = [];
    this.ble.scan([],this.tempo).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }

  onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }

  myGreeting() {
    return this.msgBack = "Acabou"
  }
}
