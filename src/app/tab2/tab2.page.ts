import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserService } from '../servicios/user/user.service';
import { Items } from '../clases/Items/items';
import { ItemsService } from '../servicios/items/items.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public item= new Items();
  public items:Items[]=[];
  public isLoading = true;
  public loading:any;

  constructor(
    public userService:UserService,
    public itemService:ItemsService,
    private loadingController: LoadingController
  ) {}

  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit()
      event.target.complete();
    }, 2000);
  }

async ngOnInit(){
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loading.present();

    this.userService.Verificar();
    this.itemService.allitems().then((res)=>{
      this.items=res
      this.loading.dismiss();
      this.isLoading = false;
    })
  }


}
