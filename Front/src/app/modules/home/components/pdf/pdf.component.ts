import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { logo } from 'app/shared/models/logo';
import { Produto } from 'app/shared/models/produto.model';
import { ProdutoService } from 'app/shared/services/produto.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subject, takeUntil } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit, OnDestroy {
  products: Produto[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this._produtoService.items$.pipe(takeUntil(this._unsubscribeAll)).subscribe((response: Produto[]) => {
      if (response) {
        this.products = response;
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  generatePDF(): void {
    const docDefinition = {
      content: [
        {
          image: logo,
          width: 100,
          height: 50,
        },
        {
          text: 'LISTA DE PRODUTOS',
          style: 'center',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'Descrição', style: 'dark' },
                { text: 'Data Cadastro', style: 'dark' },
              ],
              ...this.products.map(p => [
                p.descricao,
                {
                  text: formatDate(p.dataCadastro, 'dd/MM/yyyy', 'pt-br'),
                  alignment: 'center',
                },
              ]),
            ],
          },
        },
      ],
      styles: {
        center: {
          bold: true,
          fontSize: 18,
          alignment: 'center',
          margin: [0, 20, 0, 30],
        },
        title: {
          alignment: 'center',
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        espaco: {
          margin: [0, 0, 0, 15],
        },
        dark: {
          bold: true,
          color: 'black',
          noWrap: true,
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  }

  getList(): void {
    this._produtoService.getAll().subscribe();
  }
}
