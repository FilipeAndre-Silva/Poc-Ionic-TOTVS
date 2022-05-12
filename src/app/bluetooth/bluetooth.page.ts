import { Component, OnInit, NgZone } from '@angular/core';
import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  teeth: any;
  devices: any[] = [];
  tempo = 5;
  
  constructor(private ble: BLE, private ngZone: NgZone,public loadingController: LoadingController) {}

  ngOnInit() {
  }

  async Scan(){
    this.devices = [];
    this.ble.scan([],this.tempo).subscribe(
      async device => await this.onDeviceDiscovered(device)
    );
  }

  async onDeviceDiscovered(device){
    console.log('Discovered' + JSON.stringify(device,null,2));
    this.ngZone.run(()=>{
      this.devices.push(device)
      console.log(device)
    })
  }

  async presentLoading() {
    await this.Scan();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
