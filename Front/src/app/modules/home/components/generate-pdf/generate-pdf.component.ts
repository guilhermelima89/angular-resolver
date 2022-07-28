import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AtualizacaoCadastral } from 'app/shared/models/atualizacao-cadastral.model';
import { logoEmpresa } from 'app/shared/models/logo-empresa.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
})
export class GeneratePdfComponent {
  @Input() item: AtualizacaoCadastral;

  gerarPdf(item: AtualizacaoCadastral): void {
    const docDefinition = {
      content: [
        {
          image: logoEmpresa,
          width: 100,
          height: 50,
        },
        {
          text: 'ATUALIZAÇÃO CADASTRAL',
          style: 'center',
        },
        {
          table: {
            widths: [500, 100],
            body: [[{ text: 'DADOS PESSOAIS', style: 'title', border: [true, true, true, true] }]],
          },
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Data da Solicitação :',
              bold: true,
              margin: [0, 10, 10, 5],
            },
            {
              text: formatDate(item.dataCriacao, 'dd/MM/yyyy', 'pt-br'),
              width: 'auto',
              margin: [0, 10, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Beneficiário :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.nome,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Código :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.codigo,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'E-mail :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.email,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Telefone :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.telefone,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Atendente :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.atendente,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          table: {
            widths: [500, 100],
            body: [[{ text: 'ENDEREÇO', style: 'title', border: [true, true, true, true] }]],
          },
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Cep :',
              bold: true,
              margin: [0, 10, 10, 5],
            },
            {
              text: item.cep,
              width: 'auto',
              margin: [0, 10, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Logradouro :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.logradouro,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Número :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.numero,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Complemento :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.complemento,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Bairro :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.bairro,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Cidade :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.cidade,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Estado :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.estado,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          table: {
            widths: [500, 100],
            body: [[{ text: 'RESPONSÁVEL', style: 'title', border: [true, true, true, true] }]],
          },
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Nome :',
              bold: true,
              margin: [0, 10, 10, 5],
            },
            {
              text: item.nomeResponsavel,
              width: 'auto',
              margin: [0, 10, 10, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'E-mail :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.emailResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Telefone :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.telefoneResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Cep :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.cepResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Logradouro :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.logradouroResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Número :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.numeroResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Complemento :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.complementoResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Bairro :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.bairroResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Cidade :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.cidadeResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Estado :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.estadoResponsavel,
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          table: {
            widths: [500, 100],
            body: [[{ text: 'OUTRAS INFORMAÇÕES', style: 'title', border: [true, true, true, true] }]],
          },
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Autoriza fatura mensal por e-mail :',
              bold: true,
              margin: [0, 10, 10, 5],
            },
            {
              text: item.autorizaFatura === true ? 'Sim' : 'Não',
              width: 'auto',
              margin: [0, 10, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Autoriza informações por SMS :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.autorizaSms === true ? 'Sim' : 'Não',
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              width: 'auto',
              text: 'Autoriza informações por WhatsApp :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.autorizaWhatsApp === true ? 'Sim' : 'Não',
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
        },

        {
          columns: [
            {
              width: 'auto',
              text: 'Autoriza receber boletos e correspondências :',
              bold: true,
              margin: [0, 0, 10, 5],
            },
            {
              text: item.autorizaCorrespondencia === true ? 'Sim' : 'Não',
              width: 'auto',
              margin: [0, 0, 0, 5],
            },
          ],
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
}
