import { CompraDTO } from './dto/compraDTO';
import { GeracaoDTO } from './dto/geracaoDTO';
import { PrecoMedioDTO } from './dto/precoMedioDTO';
import { RegiaoDTO } from './dto/regiaoDTO';
import { AgenteDTO } from './dto/agenteDTO';
import { Component, ViewChild } from '@angular/core';
import * as converter from 'xml-js';
import { AppServiceService } from './app.service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('arquivo') fileshtml:any;
  
  listAgente:AgenteDTO[] = []
  porcentagemUpload = 0;
  arquivoPreview: any;
  valueProgress = 0;
  displayProcess = 'none';
  files = [];
  
  constructor(private service: AppServiceService, private toastr: ToastrService) {
  }  
  
  public loadXML(event: any) {       
     this.files = event.target.files;
     let ac = 0;
     this.displayProcess = 'block';
      for(let file of this.files) {    
        const reader: FileReader = new FileReader();
        reader.onload = (ev: any) => {
          let xml = ev.target.result;
          let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
          let JSONData:any = JSON.parse(result1);
          if(Array.isArray(JSONData.agentes.agente)) {
            ac++;
            this.createObj(JSONData.agentes.agente, ac === this.files.length ? true : false);
          }else {
            ac++;
            let arr:any = [];
            arr.push(JSONData.agentes.agente)
            this.createObj(arr, ac === this.files.length ? true : false);
        }
      }
      reader.readAsText(file);
    }
  }
  
  private postAgentes() {
    let ii = 0;
    this.listAgente.map(ag => {
      ii++;
     this.valueProgress = this.calculateProcess(this.listAgente.length, ii);
      this.service.post(ag).subscribe({
        next: (data) => {
              return;
            }, error: (e) => alert("Error --> " + e.error)
          });
      })
      this.clear();
  }

  private createObj(obj: any,  exc: boolean) {
    for(let i of obj) {
      let regioesDTO : RegiaoDTO[] = [];         

      for(let r of i.regiao) {
        let compras: any = [];
        let geracoes: any = [];
        let precosMedio: any = [];
        
        for(let c of r.compra.valor) {
          let comp : CompraDTO = {
            valor:c._text,
          }
          compras.push(comp);
        }
        for(let g of r.geracao.valor) {
          let gera : GeracaoDTO = {
            valor:g._text,
          }
          geracoes.push(gera);
        }
        for(let p of r.precoMedio.valor) {
          let precos : PrecoMedioDTO = {
            //valor:p._text, Removido o valor do Preco Medio
            valor:0,
          }
          precosMedio.push(precos);
        }
        let reg : RegiaoDTO = {
          sigla:r._attributes.sigla,
          comprasDTO:compras, 
          geracoesDTO:geracoes,
          precosMedioDTO:precosMedio
        };
        regioesDTO.push(reg);
      }
      this.listAgente.push(new AgenteDTO(parseInt(i.codigo._text), i.data._text, regioesDTO));
    }
    if(exc) {
      this.postAgentes();
    }
  }
  
  private clear() {
    this.toastr.success("Arquivos Enviado com Sucesso");
    this.valueProgress = 0;
    this.displayProcess = 'none';
    this.listAgente = [];
    this.files = [];
    this.fileshtml.nativeElement.value = '';
  }
  
  private calculateProcess(val: number, i: number) {
    return ((val * i) / 100) * 10;
  }
  
}
