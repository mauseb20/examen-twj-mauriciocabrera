import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css']
})
export class PastelComponent implements OnInit {
  title='Pasteles';
  private _parametros:any;
  pasteles=[];
  nuevoPastel={};
  disableButtons ={
    NuevoPastelFormSubmitButton: false
  };
  mostrarCrear=false;
  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService) { }
  ngOnInit() {
    this._ActivatedRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._http.get(this._masterURL.url+'Pastel?PasteleriaPrepara='+this._parametros.idPasteleria).subscribe(
        (res)=>{
          this.pasteles=res.json().map((value)=>{
            value.mostrarEditar=false;
            return value;
          });
        },
        (error)=>{
          console.log(error);
        }
      )
    })
  }
  crearPastel (formulario: NgForm){
    this.disableButtons.NuevoPastelFormSubmitButton = true;
    this._http.post(this._masterURL.url+"Pastel",{
      nombrePastel:formulario.value.nombrePastel,
      tmpElaboracion:formulario.value.tmpElaboracion,
      urlFoto:formulario.value.urlFoto,
      PasteleriaPrepara:this._parametros.idPasteleria
    }).subscribe(
      (res)=>{
        this.pasteles.push(res.json());
        this.nuevoPastel = {};
        this.disableButtons.NuevoPastelFormSubmitButton=false;
        this.mostrarCrear=false;
      },
      (error)=>{
        this.disableButtons.NuevoPastelFormSubmitButton=false;
        console.log("Ocurrio un error", error);
      },
      ()=>{
        console.log("Termino la funcion vamos a la casa");
      }
    )
  }

  borrarPastel(idPastel: number) {
    this._http.delete(this._masterURL.url + "Pastel/" +idPastel).subscribe(
      (res)=>{
        let pastelBorrado = res.json();
        this.pasteles=this.pasteles.filter(value=>pastelBorrado.idPastel!=value.idPastel)
      }
    )
  }
  editarPastel(pastel: any){
    let parametros={
      nombrePast:pastel.nombrePastel,
      tmpElaboracion:pastel.tmpElaboracion,
      urlFoto:pastel.urlFoto,
      PasteleriaPrepara:this._parametros.idPasteleria
    };
    this._http.put(this._masterURL.url+"Pastel/"+pastel.idPastel,parametros).subscribe(
      (res:Response)=>{
        pastel.mostrarEditar=!pastel.mostrarEditar;
        console.log("Respuesta",res.json());
      },
      (error)=>{
        console.log("Error",error)
      }
    )
  }

}
