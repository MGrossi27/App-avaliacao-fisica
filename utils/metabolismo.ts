type Sexo = 'Masculino' | 'Feminino';

interface MetabolismoInput {
  peso: number;
  altura: number;
  idade: number;
  sexo: Sexo;
  fatorAtividade: number;
}

interface MetabolismoOutput {
  tmb: number;
  ndc: number;
}

export function calcularTMBNDC({ peso, altura, idade, sexo, fatorAtividade }: MetabolismoInput): MetabolismoOutput {
  const tmb =
    sexo === 'Masculino'
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;

  const ndc = tmb * fatorAtividade;

  return {
    tmb: parseFloat(tmb.toFixed(2)),
    ndc: parseFloat(ndc.toFixed(2)),
  };
}
