class AbrigoAnimais {
  static ANIMAIS = {
    Rex:   { especie: 'cão',    favoritos: ['RATO', 'BOLA'] },
    Mimi:  { especie: 'gato',   favoritos: ['BOLA', 'LASER'] },
    Fofo:  { especie: 'gato',   favoritos: ['BOLA', 'RATO', 'LASER'] },
    Zero:  { especie: 'gato',   favoritos: ['RATO', 'BOLA'] },
    Bola:  { especie: 'cão',    favoritos: ['CAIXA', 'NOVELO'] },
    Bebe:  { especie: 'cão',    favoritos: ['LASER', 'RATO', 'BOLA'] },
    Loco:  { especie: 'jabuti', favoritos: ['SKATE', 'RATO'] },
  };

  static BRINQUEDOS_VALIDOS = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);

  /**
   * @param {string} brinquedosPessoa1
   * @param {string} brinquedosPessoa2
   * @param {string} ordemAnimais
   * @returns {{lista: string[]} | {erro: string}}
   */
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const parseLista = (txt) =>
      (txt ?? '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const parseBrinquedos = (txt) =>
      parseLista(txt).map(x => x.toUpperCase());

    const temDuplicados = (arr) => new Set(arr).size !== arr.length;

    const favComoSubsequencia = (lista, favoritos) => {
      let i = 0;
      for (const item of lista) {
        if (item === favoritos[i]) i++;
        if (i === favoritos.length) return true;
      }
      return i === favoritos.length;
    };

    const contemTodos = (lista, favoritos) => favoritos.every(f => lista.includes(f));

    const ordem = parseLista(ordemAnimais);
    const animaisInvalidos =
      ordem.length === 0 ||
      temDuplicados(ordem) ||
      ordem.some(nome => !(nome in AbrigoAnimais.ANIMAIS));
    if (animaisInvalidos) return { erro: 'Animal inválido' };

    const p1 = parseBrinquedos(brinquedosPessoa1);
    const p2 = parseBrinquedos(brinquedosPessoa2);
    const brinquedoInvalido =
      p1.length === 0 ||
      p2.length === 0 ||
      temDuplicados(p1) ||
      temDuplicados(p2) ||
      !p1.every(b => AbrigoAnimais.BRINQUEDOS_VALIDOS.has(b)) ||
      !p2.every(b => AbrigoAnimais.BRINQUEDOS_VALIDOS.has(b));
    if (brinquedoInvalido) return { erro: 'Brinquedo inválido' };

    const adotadosPor = { 1: [], 2: [] };
    const gatosPorPessoa = { 1: 0, 2: 0 };
    const podeReceber = (p) => adotadosPor[p].length < 3;
    const jaTemOutroAnimal = (p) => adotadosPor[p].length > 0;

    const resultado = [];

    for (const nome of ordem) {
      const { especie, favoritos } = AbrigoAnimais.ANIMAIS[nome];

      const cond1 = nome === 'Loco'
        ? (contemTodos(p1, favoritos) && jaTemOutroAnimal(1))
        : favComoSubsequencia(p1, favoritos);

      const cond2 = nome === 'Loco'
        ? (contemTodos(p2, favoritos) && jaTemOutroAnimal(2))
        : favComoSubsequencia(p2, favoritos);

      const apto1 = cond1 && podeReceber(1) && (especie !== 'gato' || gatosPorPessoa[1] === 0);
      const apto2 = cond2 && podeReceber(2) && (especie !== 'gato' || gatosPorPessoa[2] === 0);

      let destino = 'abrigo';
      if (apto1 && !apto2) {
        destino = 'pessoa 1';
        adotadosPor[1].push(nome);
        if (especie === 'gato') gatosPorPessoa[1]++;
      } else if (!apto1 && apto2) {
        destino = 'pessoa 2';
        adotadosPor[2].push(nome);
        if (especie === 'gato') gatosPorPessoa[2]++;
      }
      resultado.push(`${nome} - ${destino}`);
    }

    resultado.sort((a, b) => a.localeCompare(b, 'pt-BR'));
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
