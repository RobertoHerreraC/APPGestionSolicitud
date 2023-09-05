import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

import { ResponsableService } from 'src/app/service/responsable.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaApiService } from 'src/app/service/persona-api.service';
import { TipoEntregaService } from 'src/app/service/tipo-entrega.service';
import { TipoEntrega } from 'src/app/interfaces/tipo-entrega';
import { SolicitudAlta } from 'src/app/interfaces/solicitud-alta';
import { Responsable } from 'src/app/interfaces/responsable';
import { forkJoin } from 'rxjs';
import { PlazoService } from 'src/app/service/plazo.service';
import { Plazo } from 'src/app/interfaces/plazo';
import { SolicitudService } from 'src/app/service/solicitud.service';
@Component({
    selector: 'app-formulario-page',
    templateUrl: './formulario-page.component.html',
    styleUrls: ['./formulario-page.component.css']
})

export class FormularioPageComponent implements OnInit {
    // solicitudAlta!: SolicitudAlta;

    solicitudDatosAlta! : SolicitudAlta;

    nombreFRAI: string = "No se ha propocionados datos del responsable";
    formasEntrega: TipoEntrega[] = [];
    formaEntregaSeleccionada: number = 0;

    idFrai: number = 0;
    idMpv: number = 0;
    idResponsableClasificacion : number = 0;
    plazoActual : Plazo; 

    tipoDocumentoSeleccionado: string = 'DNI';
    // tipoPersonaSeleccionada: string = 'natural';
    formularioSolicitud: FormGroup = new FormGroup({});
    isButtonDisabled: boolean = this.formularioSolicitud.value.tipoDocumento === 'DNI';
    


    constructor(
        private fb: FormBuilder,
        private _responsableServicio: ResponsableService,
        private _tipoEntrega: TipoEntregaService,
        private _personaAPI: PersonaApiService,
        private _plazoServicio: PlazoService,
        private _solicitudService:SolicitudService
    ){
        this.formularioSolicitud = this.fb.group({
            tipoPersona: ['natural'],

            personaNatural: this.fb.group({
                nroDocumento: ['', [Validators.required,Validators.maxLength(8), Validators.pattern('[0-9]{8}')]],
                tipoDocumento: ['DNI'],
                nombres:    ['', [ Validators.required ]],
                apellidoPaterno:    ['', [ Validators.required ]],
                apellidoMaterno:    ['', [ Validators.required ]],
            }),
            personaJuridica: this.fb.group({
                ruc: ['', []],
                razonSocial:   ['', []],
            }),
            fraiId: ['', Validators.required],
            formaEntregaID : ['', Validators.required],
            departamento: ['', Validators.required],
            provincia: ['', Validators.required],
            distrito: ['', Validators.required],
            direccion:  ['', [Validators.minLength(10), Validators.required ]],
            correo:  ['', [Validators.minLength(6), Validators.required, Validators.email]],
            celular:  ['', [Validators.minLength(6), Validators.required, Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
            informacionSolicitada:  ['', [Validators.minLength(6), Validators.required]],
            declaracionJurada: [false],
        });


        this.formularioSolicitud.get('tipoPersona')!.valueChanges.subscribe((newValue) => {
            // this.tipoPersonaSeleccionada = newValue;
            this.updateValidatorsTipoPersona(newValue);
        });

        const tp = this.formularioSolicitud.get('personaNatural')!;
        tp.get('tipoDocumento')!.valueChanges.subscribe((newValue) => {
            this.tipoDocumentoSeleccionado = newValue;
            this.updateValidators();
        });

        this.plazoActual = {
            diasProrroga: 0,
            diasPlazoMaximo: 0,

        }

    }
    

    //UTILIDADES
    //Actualizar las validaciones de persona natural y juridica
    private updateValidatorsTipoPersona(tipo:string) {
        
        const personaNatural = this.formularioSolicitud.get('personaNatural')!;
        const personaJuridica = this.formularioSolicitud.get('personaJuridica')!;

        const nroDocumento = personaNatural.get('nroDocumento')!;
        const tipoDocumento = personaNatural.get('tipoDocumento')!;
        const nombre =personaNatural.get('nombres')!;
        const apellidoPaterno = personaNatural.get('apellidoPaterno')!;
        const apellidoMaterno = personaNatural.get('apellidoMaterno')!;


        
        const ruc = personaJuridica.get('ruc')!;
        const razonSocial = personaJuridica.get('razonSocial')!;
        

        if (tipo === 'natural' ) {
            
            tipoDocumento.setValue('DNI');

            nroDocumento.setValue('');
            nroDocumento.clearValidators();
            nroDocumento.setValidators([Validators.required, Validators.maxLength(8), Validators.pattern('[0-9]{8}')]);
            nroDocumento.updateValueAndValidity();

            nombre.setValue('');
            nombre.clearValidators();
            nombre.setValidators([Validators.required, Validators.minLength(2)]);
            nombre.updateValueAndValidity();

            apellidoPaterno.setValue('');
            apellidoPaterno.clearValidators();
            apellidoPaterno.setValidators([Validators.required, Validators.minLength(2)]);
            apellidoPaterno.updateValueAndValidity();

            apellidoMaterno.setValue('');
            apellidoMaterno.clearValidators();
            apellidoMaterno.setValidators([Validators.required, Validators.minLength(2)]);
            apellidoMaterno.updateValueAndValidity();

            ruc.setValue('');
            ruc.clearValidators();
            ruc.setValidators([Validators.maxLength(11), Validators.pattern('[0-9]{11}')]);
            ruc.updateValueAndValidity();

            razonSocial.setValue('');
            razonSocial.clearValidators();
            razonSocial.setValidators([Validators.minLength(2)]);
            razonSocial.updateValueAndValidity();
            this.limpiarFormulario();

        } else if (tipo === 'juridica') {
            tipoDocumento.setValue('DNI');

            nroDocumento.setValue('');
            nroDocumento.clearValidators();
            nroDocumento.setValidators([Validators.maxLength(8), Validators.pattern('[0-9]{8}')]);
            nroDocumento.updateValueAndValidity();

            nombre.setValue('');
            nombre.clearValidators();
            nombre.setValidators([Validators.minLength(2)]);
            nombre.updateValueAndValidity();

            apellidoPaterno.setValue('');
            apellidoPaterno.clearValidators();
            apellidoPaterno.setValidators([Validators.minLength(2)]);
            apellidoPaterno.updateValueAndValidity();

            apellidoMaterno.setValue('');
            apellidoPaterno.clearValidators();
            apellidoMaterno.setValidators([Validators.minLength(2)]);
            apellidoMaterno.updateValueAndValidity();

            ruc.setValue('');
            ruc.clearValidators();
            ruc.setValidators([Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]{11}')]);
            ruc.updateValueAndValidity();

            razonSocial.setValue('');
            razonSocial.clearValidators();
            razonSocial.setValidators([Validators.required, Validators.minLength(2)]);
            razonSocial.updateValueAndValidity();

            this.limpiarFormulario();
        } 
    }


    //armar validaciones Personsa Natural
    private updateValidators() {
        const personaNatural = this.formularioSolicitud.get('personaNatural')!;
        const nroDocumento = personaNatural.get('nroDocumento')!;
        nroDocumento.clearValidators();
       

        if (this.tipoDocumentoSeleccionado === 'DNI') {
            nroDocumento.setValidators([Validators.required, Validators.pattern('/^\d{8}$/')]);

            nroDocumento.setValue('');
        } else if (this.tipoDocumentoSeleccionado  === 'CE' || this.tipoDocumentoSeleccionado  === 'OTRO') {
            nroDocumento.setValidators([Validators.required,  Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^\d+$/)]);
            nroDocumento.setValue('');
        } 
        nroDocumento.updateValueAndValidity();
    }


    
    limpiarFormulario():void{
        const direccion = this.formularioSolicitud.get('direccion')!;
        const correo = this.formularioSolicitud.get('correo')!;
        const celular = this.formularioSolicitud.get('celular')!;
        const informacionSolicitada = this.formularioSolicitud.get('informacionSolicitada')!;
        const declaracionJurada = this.formularioSolicitud.get('declaracionJurada')!;


        direccion.setValue('');
        direccion.updateValueAndValidity();
        correo.setValue('');
        correo.updateValueAndValidity();
        celular.setValue('');
        celular.updateValueAndValidity();
        informacionSolicitada.setValue('');
        informacionSolicitada.updateValueAndValidity();
        declaracionJurada.setValue(false);
        declaracionJurada.updateValueAndValidity();
    }

    ngOnInit(): void {
        this.updateButtonState();
        this.cargarDatos();
    }


    //LLAMADAS A APIS
    private cargarDatos(){

        forkJoin([
            this._responsableServicio.listaPorArea(environment.idFrai),
            this._responsableServicio.listaPorArea(environment.idMvp),
            this._responsableServicio.listaPorArea(environment.idResponsableClasificacion),
            this._tipoEntrega.lista(),
            this._plazoServicio.obtenerPlazo()
          ]).subscribe({
            next: ([resFrai, resMvp, resRC, resEntrega, resPlazo]) => {
                if(resEntrega.status) {
                    this.formasEntrega = resEntrega.value;
                }

                if(resFrai.status) {
                    if(resFrai.value.length > 0){
                        this.nombreFRAI = `${resFrai.value[0].responsable.nombres} ${resFrai.value[0].responsable.apellidoPaterno} ${resFrai.value[0].responsable.apellidoMaterno}`;
                        this.idFrai = resFrai.value[0].responsableID;
                        this.formularioSolicitud.get('fraiId')!.setValue(this.idFrai);
                    }
                }

                if(resMvp.status) {
                    if(resMvp.value.length > 0){
                        this.idMpv = resMvp.value[0].responsableID;
                    }
                }

                if(resRC.status) {
                    if(resRC.value.length > 0){
                        this.idResponsableClasificacion = resRC.value[0].responsableID;
                    }
                }

                if(resEntrega.status) {
                    if(resEntrega.value.length > 0){
                        this.formasEntrega = resEntrega.value;
                    }
                }

                if(resPlazo.status){
                    this.plazoActual = resPlazo.value;
                }
                console.log(resFrai);
                console.log(resMvp);
                console.log(resRC);
                console.log(resEntrega);
                console.log(this.plazoActual);

            },
            error: error => {
                // Handle error
                console.error('Error al cargar datos:', error);
              },
              complete: () => {
                // Handle completion
              }
        });

    } 

    // OTROS
    onComboChange() {        
        this.updateButtonState();
    }

    private updateButtonState() {
        const personaNatural = this.formularioSolicitud.get('personaNatural')!;
        this.isButtonDisabled = personaNatural.get('tipoDocumento')!.value !== 'DNI';
    }

    getMaxlength() {
        const personaNatural = this.formularioSolicitud.get('personaNatural')!;
        const nroDocumento = personaNatural.get('tipoDocumento')!.value;
        if (nroDocumento === 'DNI') {
          return 8;
        } else if (nroDocumento === 'CE') {
          return 12;
        } else if (nroDocumento === 'OTRO') {
          return 12;
        }
        return 0; // Valor por defecto
    }

    //ACCIONES CON APIS
    //Validar busqueda persona natural y juridica
    async searchPersonData() {
        const personaNatural = this.formularioSolicitud.get('personaNatural')!;
        const personaJuridica = this.formularioSolicitud.get('personaJuridica')!;
        const controlNroDocumento = personaNatural.get('nroDocumento')!;
        const controlNroRuc = personaJuridica.get('ruc')!;
        
        if(this.formularioSolicitud.value.tipoPersona === 'natural'){
            if(controlNroDocumento.valid){
                
                this._personaAPI.validarDni(controlNroDocumento.value).subscribe({
                    next: (data) => {
                    //   console.log(data);
                      personaNatural.get('nombres')!.setValue(data.value.nombres);
                      personaNatural.get('apellidoPaterno')!.setValue(data.value.apellidoPaterno);
                      personaNatural.get('apellidoMaterno')!.setValue(data.value.apellidoMaterno);
                    },
                    error:(e) => {
                      // Manejo de errores en caso de que la solicitud falle.
                      console.error(e);
                    }
                });

            }else{
                console.log("datos incorrectos")
            }

        }else if(this.formularioSolicitud.value.tipoPersona === 'juridica'){
            if(controlNroRuc.valid){
                
                this._personaAPI.validarRuc(controlNroRuc.value).subscribe({
                    next: (data) => {
                    //   console.log(data);
                      personaJuridica.get('razonSocial')!.setValue(data.value.razonSocial);
                      
                    },
                    error:(e) => {
                      // Manejo de errores en caso de que la solicitud falle.
                      console.error(e);
                    }
                });

                
            }else{
                console.log("datos incorrectos")
            }
        }

        // const dd = this.formularioSolicitud.get('nroDocumento')!;

        // const errors = dd?.errors;
        //         console.log( errors ? Object.keys(errors) : []);
      }

      validarDeclaracion() {
        const declaracionJurada = this.formularioSolicitud.get('declaracionJurada')?.value;
    
        if (declaracionJurada) {
          console.log('El checkbox está seleccionado.');
        } else {
          console.log('El checkbox no está seleccionado.');
        }
      }
    
    validateAndSubmit() {
        this.validarDeclaracion();
        if (this.formularioSolicitud.valid) {
            // Perform submission logic
            console.log("registrar SOLICITUD");
            const personaNatural = this.formularioSolicitud.get('personaNatural');
            const personaJuridica = this.formularioSolicitud.get('personaJuridica');
            
            
            console.log(this.plazoActual.diasPlazoMaximo);
            this.solicitudDatosAlta =  {
                personaNatural: personaNatural?.valid ? personaNatural?.value : null,
                personaJuridica: personaJuridica?.valid ? personaJuridica?.value : null,
                FraiId: this.formularioSolicitud.get('fraiId')?.value,
                correo: this.formularioSolicitud.get('correo')?.value,
                telefono: this.formularioSolicitud.get('celular')?.value,
                informacionSolicitada: this.formularioSolicitud.get('informacionSolicitada')?.value,
                formaEntregaID: this.formularioSolicitud.get('formaEntregaID')?.value,
                direccion: this.formularioSolicitud.get('direccion')?.value,
                departamento: this.formularioSolicitud.get('departamento')?.value,
                provincia: this.formularioSolicitud.get('provincia')?.value,
                distrito: this.formularioSolicitud.get('distrito')?.value,
                mpvID: this.idMpv,
                responsableClasificacionID: this.idResponsableClasificacion,
                plazoMaximo : this.plazoActual.diasPlazoMaximo,
                prorroga : this.plazoActual.diasProrroga
              };

              console.log(this.solicitudDatosAlta);

              this._solicitudService.alta(this.solicitudDatosAlta).subscribe({
                next: (resp) =>{
                    console.log('Datos enviado con exito ',resp );
                    this.limpiarFormulario();
                  }, 
                  error: error =>{
                    console.error('Error al enviar datos: ',error);
                  },
                  complete: () => {
                    console.log('complete ' );
                  }
              });
                
                
        //         resp=>{
        //         console.log('Datos enviado con exito ',resp )
        //       }, error =>{
        //         console.error('Error al enviar datos: ',error)
        //       })

        // }else{
        //     console.log("campos incompletos");
         }
    }

   


      isControlInvalid(controlName: string): boolean {
        const control = this.formularioSolicitud.get(controlName)!;
        // return control.invalid && (control.dirty || control.touched);
        return control.invalid && control.touched;
        // return true;
      }

      isControlInvalidPersona(controlPadre:string, controlName: string): boolean {
        // console.log("isControlInvalidPersona");
        const controlGroup = this.formularioSolicitud.get(controlPadre) as FormGroup;
        // console.log(controlPadre,controlGroup);
        const control = controlGroup.get(controlName)!;
        // console.log(controlName,control);
        // return control.invalid && (control.dirty || control.touched);
        return control.invalid && control.touched;
      }




}