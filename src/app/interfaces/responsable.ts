import { Area } from "./area";
import { PersonaNatural } from "./persona-natural";

export interface Responsable {
    responsableID?:    number;
    responsable:        PersonaNatural;
    area:       Area;
    correo: string,
    estado: number
}