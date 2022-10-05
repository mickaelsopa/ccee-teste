import { RegiaoDTO } from "./regiaoDTO";

export class AgenteDTO {
    
    codigo?: number;
    data?: string;
    regioesDTO?: RegiaoDTO[] = [];

    constructor(codigo: number, data: string, regioesDTO: RegiaoDTO[]) {
        this.codigo = codigo;
        this.data = data;
        this.regioesDTO = regioesDTO;
    }

}