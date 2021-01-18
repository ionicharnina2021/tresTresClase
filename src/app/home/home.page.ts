import { Geolocation, Geoposition } from "@ionic-native/geolocation/ngx";
import { Platform, ToastController } from "@ionic/angular";
import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  uno:Geoposition;
  ubicacion = { lat: 0, long: 0 };
  //En este proyecto ya tenemos instalado el geolocation
  constructor(
    private plat: Platform,
    private geolocation: Geolocation,
    public toast: ToastController
  ) {}
  localizar() {
    this.plat
      .ready()
      .then(() => {
        this.geolocation
          .getCurrentPosition()
          .then((info) => {
            this.ubicacion.lat = info.coords.latitude;
            this.ubicacion.long = info.coords.longitude;
          })
          .catch(async (error) => {
            let toast=this.toast.create({
              message:'error '+error,
              duration:1000
            });
            (await toast).present();
          });
      })
      .catch();
  }
}
