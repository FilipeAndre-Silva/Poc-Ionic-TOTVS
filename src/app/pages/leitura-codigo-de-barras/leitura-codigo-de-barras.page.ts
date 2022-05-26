import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-leitura-codigo-de-barras',
  templateUrl: './leitura-codigo-de-barras.page.html',
  styleUrls: ['./leitura-codigo-de-barras.page.scss'],
})
export class LeituraCodigoDeBarrasPage implements OnInit {

  code: any;
  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
     
  }
}
