import { Tarjetas } from "./tarjetas";

export class Items {
    id?:string;
    itemname!: string;
    total!: number;
    color!: string;
    estado!: string;
    tarjetas:Tarjetas[]=[];
    userId!: string

    setValues(item:any){
      this.id=item.id;
      this.itemname=item.itemname;
      this.total=item.total;
      this.color=item.color;
      this.estado=item.estado;
      this.tarjetas=item.tarjetas;
      this.userId= item.userId;
    }
}
