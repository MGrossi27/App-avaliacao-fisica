export function calcularComposicaoCorporal({
  sexo,
  idade,
  peso,
  metodo,
  dobras,
}: ComposicaoInput): ResultadoComposicao {
  const valores = Object.values(dobras);
  const soma = valores.reduce((acc, val) => acc + val, 0);
  const somaQuadrado = Math.pow(soma, 2);

  let densidade = 0;

  if (metodo === '3') {
    densidade =
      sexo === 'Masculino'
        ? 1.10938 - 0.0008267 * soma + 0.0000016 * somaQuadrado - 0.0002574 * idade
        : 1.0994921 - 0.0009929 * soma + 0.0000023 * somaQuadrado - 0.0001392 * idade;
  }

  if (metodo === '4') {
    densidade =
      sexo === 'Masculino'
        ? 1.1620 - 0.0630 * Math.log10(soma)
        : 1.1582 - 0.0722 * Math.log10(soma);
  }

  if (metodo === '7') {
    densidade =
      sexo === 'Masculino'
        ? 1.112 - 0.00043499 * soma + 0.00000055 * somaQuadrado - 0.00028826 * idade
        : 1.097 - 0.00046971 * soma + 0.00000056 * somaQuadrado - 0.00012828 * idade;
  }

  if (densidade === 0) {
    throw new Error('Método de dobras inválido ou incompleto.');
  }

  const percentualGordura = ((4.95 / densidade) - 4.5) * 100;
  const massaGorda = (peso * percentualGordura) / 100;
  const massaMagra = peso - massaGorda;

  const percentualIdeal = sexo === 'Masculino' ? 0.12 : 0.20;
  const pesoMaximo = massaMagra / (1 - percentualIdeal);
  const objetivoEmagrecimento = peso - pesoMaximo;

  return {
    densidade: +densidade.toFixed(4),
    percentualGordura: +percentualGordura.toFixed(2),
    massaGorda: +massaGorda.toFixed(2),
    massaMagra: +massaMagra.toFixed(2),
    pesoMaximo: +pesoMaximo.toFixed(2),
    objetivoEmagrecimento: +objetivoEmagrecimento.toFixed(2),
  };
}
