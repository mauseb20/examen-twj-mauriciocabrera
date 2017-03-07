import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class PastelComponent implements OnInit {
  private _parametros:any;
  pasteles=[];
  nuevoPastel={};
  pastelerias=[];
  disableButtons ={
    NuevaPasteleriaFormSubmitButton: false
  };
  mostrarCrear=false;
  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterUrlService) { }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(parametros=>{
      this._parametros=parametros;
      this._http.get(this._masterURL.url+'Patel?PasteleriaPrepara='+this._parametros.idPasteleria).subscribe(
        (res)=>{
          this.pasteles=res.json();
        },
        (error)=>{
          console.log(error);
        }
      )
    })
  }
  crearPastel (formulario:NgForm){
    this.disableButtons.NuevoPastelFormSubmitButton = true;
    this._http.post(this._masterURL.url+"Pastel",{
      nombrePasteleria:formulario.value.nombrePasteleria,
      ciudad:formulario.value.ciudad,
      correo:formulario.value.correo,
      urlLogo:formulario.value.urlLogo
    }).subscribe(
      (res)=>{
        this.pastelerias.push(res.json());
        this.nuevaPasteleria = {};
        this.disableButtons.NuevaPasteleriaFormSubmitButton=false;
        this.mostrarCrear=false;
      },
      (error)=>{
        this.disableButtons.NuevaPasteleriaFormSubmitButton=false;
        console.log("Ocurrio un error", error);
      },
      ()=>{
        console.log("Termino la funcion vamos a la casa");
      }
    )
  }

  borrarPasteleria(idPasteleria: number) {
    this._http.delete(this._masterURL.url + "Pasteleria/" +idPasteleria).subscribe(
      (res)=>{
        let pasteleriaBorrada = res.json();
        this.pastelerias=this.pastelerias.filter(value=>pasteleriaBorrada.idPasteleria!=value.idPasteleria)
      }
    )
  }
  editarPasteleria(pasteleria: any){
    let parametros={
      nombrePasteleria:pasteleria.nombrePasteleria,
      ciudad:pasteleria.ciudad,
      correo:pasteleria.correo,
      urlLogo:pasteleria.urlLogo
    };
    this._http.put(this._masterURL.url+"Pasteleria/"+pasteleria.idPasteleria,parametros).subscribe(
      (res:Response)=>{
        pasteleria.mostrarEditar=!pasteleria.mostrarEditar;
        console.log("Respuesta",res.json());
      },
      (error)=>{
        console.log("Error",error)
      }
    )
  }

}
