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
        console.log('teste ')
        this.router.navigateByUrl('/inside', { replaceUrl: true });
        //this.router.navigate(['tabs'], { replaceUrl: true });
      },
      async (res:any) => {        
        await loading.dismiss();
        console.log('teste 4')
        if(res.error){
          console.log('teste 3')
          const alert = await this.alertController.create({
            header: 'Login failed',
            message: res.error?.msg ? res.error?.msg : res,
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    );
  }
 
  /* async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
 
    this.apiService.signUp(this.credentials.value).subscribe(
      async _ => {
        await loading.dismiss();        
        this.login();
      },
      async (res:any) => {
        await loading.dismiss();        
        const alert = await this.alertController.create({
          header: 'Signup failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  } */
}