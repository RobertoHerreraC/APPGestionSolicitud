
import { PersonaJuridica } from "./persona-juridica";
import { PersonaNatural } from "./persona-natural";

export interface SolicitudAlta {
    personaNatural?: PersonaNatural;
    personaJuridica?: PersonaJuridica;
    FraiId:    number;
    correo: string;
    telefono: string;
    informacionSolicitada: string;
    formaEntregaId: number;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
}