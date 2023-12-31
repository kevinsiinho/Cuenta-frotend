import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { Login } from 'src/app/clases/login/login';
import { UserService } from 'src/app/servicios/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public login= new Login()
  public token:string=""
  public recordaremail:Boolean=true

  constructor(
    private alertController: AlertController,
    public userService: UserService,
    public link:Router) { }

  async presentAlert(msn:String) {

    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ''+msn,
      buttons: ['ACEPTAR'],
    });
    await alert.present();
  }

  ngOnInit() {
    this.RecordarEmail();
  }

  async RecordarEmail() {
    if (this.recordaremail) {
      const result = await Preferences.get({ key: 'email' });
      this.login.email = result.value!;
    } else {
      this.login.email = "";
    }
  }

ingresar(){
  if(this.login.email!=null && this.login.password!=null){
    this.userService.Login(this.login).then(async(res)=>{
       await Preferences.set({
        key: 'token',
        value: res.data.token,
      });

      if(this.recordaremail){
        await Preferences.set({
          key: 'email',
          value: this.login.email,
        });
      }

      if(res.data.token){
         this.OnQuien()
      }else{
        this.presentAlert("Usuario no encontrado")
      }
   })
  }else{
    this.presentAlert("Faltan campos por llenar")
  }

}

async OnQuien(){
  const { value } = await Preferences.get({ key: 'token' });
  if(value)
    this.userService.Quien(value).then((res)=>{
      this.link.navigate(['tabs/tab2'])
    })

  }


}

