import { Component, OnInit } from '@angular/core';
import {Response, Http} from '@angular/http';
import {NgForm} from "@angular/forms";
import {MasterUrlService} from "../services/master-url.service";

@Component({
  selector: 'app-pasteleria',
  templateUrl: './pasteleria.component.html',
  styleUrls: ['./pasteleria.component.css']
})
export class PasteleriaComponent implements OnInit {
  title = 'Catalogo de pastelerias';

  nuevaPasteleria={};
  pastelerias=[];
  disableButtons ={
    NuevaPasteleriaFormSubmitButton: false
  };
  mostrarCrear=false;
  constructor(private _http: Http, private _masterURL: MasterUrlService){
    console.log("Inicio del constructor")
  }
  ngOnInit() {
    this._http.get(this._masterURL.url+"Pasteleria").subscribe(
      (res: Response)=>{
        this.pastelerias = res.json().map((value)=>{
          value.mostrarEditar=true;
          return value;
        })
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  crearPasteleria (formulario:NgForm){
    this.disableButtons.NuevaPasteleriaFormSubmitButton = true;
    this._http.post(this._masterURL.url+"Pasteleria",{
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
