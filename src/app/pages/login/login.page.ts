import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}
 
  ngOnInit() {
    this.credentials = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.apiService.login(this.credentials.value).subscribe(
      async _ => {        
        await loading.dismiss();        
//        this.router.navigateByUrl('/inside', { replaceUrl: true });
        this.router.navigate(['/inside'])

      },
      async (res:any) => {        
        await loading.dismiss();
        if(res.error){
          const alert = await this.alertController.create({
            header: 'Erro ao efetuar login',
            message: res.error?.details[0].message ? res.error.details[0].message : res,
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    );
  }
}