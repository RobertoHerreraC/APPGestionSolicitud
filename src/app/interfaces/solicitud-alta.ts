
import { PersonaJuridica } from "./persona-juridica";
import { PersonaNatural } from "./persona-natural";

export interface SolicitudAlta {
    personaNatural?: PersonaNatural;
    personaJuridica?: PersonaJuridica;
    FraiId:    number;
    mpvID: number;
    responsableClasificacionID: number,
    correo: string;
    telefono: string;
    informacionSolicitada: string;
    formaEntregaID: number;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    plazoMaximo: number;
    prorroga: number
}

// {
//     "fraiId": 1,
//     "personaNatural": {
//       "nombres": "testnombre",
//       "apellidoPaterno": "testapellidopaterno",
//       "apellidoMaterno": "testapellidomaterno",
//       "nroDocumento": "73361835",
//       "tipoDocumento": "DNI"
//     },
//     "informacionSolicitada": "test informacion solicitada",
//     "formaEntregaId": "1",
//     "direccion": "test direccion",
//     "correo": "test@gmail.com",
//     "telefono": "924249182",
//     "departamento": "testdepartamento",
//     "provincia": "testprovincia",
//     "distrito": "testdistrito",
//   }
  