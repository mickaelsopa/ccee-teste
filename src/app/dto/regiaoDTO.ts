import { CompraDTO } from './compraDTO';
import { GeracaoDTO } from './geracaoDTO';
import { PrecoMedioDTO } from './precoMedioDTO';

export class RegiaoDTO {
    
    sigla?: string;
    precosMedioDTO?: PrecoMedioDTO[] = [];
    geracoesDTO?: GeracaoDTO[] = [];
    comprasDTO?: CompraDTO[] = [];

}