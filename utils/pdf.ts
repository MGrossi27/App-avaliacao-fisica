import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface PDFData {
  nome: string;
  densidade: number;
  percentualGordura: number;
  massaMagra: number;
  massaGorda: number;
  pesoMaximo: number;
  objetivoEmagrecimento: number;
  tmb: number | string;
  ndc: number | string;
  [key: string]: any;
}

function slugify(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '')
    .toLowerCase();
}

export async function gerarRelatorioPDF(dados: PDFData) {
  try {
    const {
      nome,
      densidade,
      percentualGordura,
      idade,
      massaMagra,
      massaGorda,
      pesoMaximo,
      objetivoEmagrecimento,
      tmb,
      ndc,
      ...resto
    } = dados;

    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('pt-BR');
    const dataArquivo = dataFormatada.replace(/\//g, '-'); // ex: 17-04-2025
    const fileName = `${slugify(nome)}-${dataArquivo}.pdf`;

    const CIRCUNFERENCIAS = [
      'Pescoço', 'Ombro', 'Peitoral', 'Cintura', 'Quadril', 'Abdômen',
      'Braço direito (relaxado)', 'Braço direito (contraído)',
      'Braço esquerdo (relaxado)', 'Braço esquerdo (contraído)',
      'Antebraço direito', 'Antebraço esquerdo',
      'Coxa direita (proximal)', 'Coxa direita (medial)', 'Coxa direita (distal)',
      'Panturrilha direita', 'Coxa esquerda (proximal)', 'Coxa esquerda (medial)',
      'Coxa esquerda (distal)', 'Panturrilha esquerda'
    ];

    const DOBRAS = [
      'Tríceps', 'Subescapular', 'Peitoral', 'Axilar',
      'Supra-ilíaca', 'Abdominal', 'Femoral'
    ];

    const colunasCirc = [[], []] as string[][];
    CIRCUNFERENCIAS.forEach((campo, i) => {
      const valor = resto[campo];
      if (valor) {
        const item = `<div class="linha">${campo}: <strong>${valor} cm</strong></div>`;
        colunasCirc[i % 2].push(item);
      }
    });

    const colunasDobras = [[], []] as string[][];
    DOBRAS.forEach((campo, i) => {
      const valor = resto[campo];
      if (valor) {
        const item = `<div class="linha">${campo}: <strong>${valor} mm</strong></div>`;
        colunasDobras[i % 2].push(item);
      }
    });

    const objetivoTexto = objetivoEmagrecimento > 0
      ? `${objetivoEmagrecimento} kg`
      : 'Nenhum';

      const html = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: #ffffff;
            padding: 40px;
          }
          h1 {
            text-align: center;
            font-size: 28px;
            color: #03dac6;
            margin-bottom: 10px;
          }
          h2 {
            text-align: center;
            font-size: 20px;
            margin: 4px 0 25px;
            color: #ccc;
          }
          .date {
            text-align: center;
            color: #bbb;
            font-size: 13px;
            margin-bottom: 30px;
          }
          .duas-colunas {
            display: flex;
            justify-content: space-between;
            gap: 40px;
            margin-bottom: 40px;
          }
          .coluna {
            flex: 1;
          }
          .linha {
            margin-bottom: 10px;
            font-size: 15px;
          }
          .circ-title {
            font-size: 20px;
            color: #00d9c2;
            margin: 40px 0 20px;
            text-align: center;
          }
          footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <h1>RESULTADO DA AVALIAÇÃO</h1>
        <h2>${nome}</h2>
        <div class="date">Data da Avaliação: ${dataFormatada}</div>

        <div class="duas-colunas">
          <div class="coluna">
            <div class="linha">Densidade Corporal: <strong>${densidade}</strong></div>
            <div class="linha">Massa Magra: <strong>${massaMagra} kg</strong></div>
            <div class="linha">TMB: <strong>${Number(tmb).toFixed(2)} kcal</strong></div>
            <div class="linha">Objetivo de Emagrecimento: <strong>${objetivoTexto}</strong></div>
            <div class="linha">% Gordura: <strong>${percentualGordura}%</strong></div>
          </div>
          <div class="coluna">
            <div class="linha">Massa Gorda: <strong>${massaGorda} kg</strong></div>
            <div class="linha">Peso Máximo: <strong>${pesoMaximo} kg</strong></div>
            <div class="linha">NDC: <strong>${Number(ndc).toFixed(2)} kcal</strong></div>
          </div>
        </div>

        ${colunasDobras[0].length || colunasDobras[1].length ? `
          <h2 class="circ-title">DOBRAS CUTÂNEAS</h2>
          <div class="duas-colunas">
            <div class="coluna">${colunasDobras[0].join('')}</div>
            <div class="coluna">${colunasDobras[1].join('')}</div>
          </div>
        ` : ''}

        ${colunasCirc[0].length || colunasCirc[1].length ? `
          <h2 class="circ-title">CIRCUNFERÊNCIAS</h2>
          <div class="duas-colunas">
            <div class="coluna">${colunasCirc[0].join('')}</div>
            <div class="coluna">${colunasCirc[1].join('')}</div>
          </div>
        ` : ''}

        <footer>
          Avaliação realizada por José Alves — Personal Trainer
        </footer>
      </body>
    </html>
    `;

    // Gera PDF temporário
    const tempFile = await Print.printToFileAsync({ html });

    // Caminho final com nome formatado
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    // Copia o PDF com nome final
    await FileSystem.copyAsync({
      from: tempFile.uri,
      to: newPath,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newPath);
    } else {
      alert('PDF gerado, mas o compartilhamento não está disponível neste dispositivo.');
    }
  } catch (error: any) {
    console.error('Erro ao gerar PDF:', error.message);
    alert('Erro ao gerar o PDF. Tente novamente.');
  }
}
