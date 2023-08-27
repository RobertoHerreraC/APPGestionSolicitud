import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';

import { ResponsableService } from 'src/app/service/responsable.service';

@Component({
    selector: 'app-formulario-page',
    templateUrl: './formulario-page.component.html',
    styleUrls: ['./formulario-page.component.css']
})

export class FormularioPageComponent implements OnInit {
    // responsableFRAI!: Responsable;
    tipoPersona :string = 'natural';
    nombreFRAI: string = "No se ha propocionados datos del responsable";
    idFrai: number = 0;

    constructor(
        private _responsableServicio: ResponsableService
    ){}
    
    ngOnInit(): void {
        this.cargarFuncionarioResponsable();
        
    }

    cargarFuncionarioResponsable(): void{
        this._responsableServicio.lista(environment.idFrai).subscribe({
            next:(data) => { 
                if(data.status) {
                    if(data.value.length > 0){
                        this.nombreFRAI = `${data.value[0].nombres} ${data.value[0].apellidoPaterno} ${data.value[0].apellidoMaterno}`;
                        this.idFrai = data.value[0].responsableId;
                    }
                }
            },
            error:(e)=>{}
        })
    }

}