class TextoUtils {
  inverter(texto) {
    return texto.split("").reverse().join("");
  }

  ehPalindromo(texto) {
    const limpo = texto.toLowerCase().replace(/[^a-z0-9]/g, "");
    return limpo === limpo.split("").reverse().join("");
  }

  capitalizar(texto) {
    return texto
      .split(" ")
      .map((palavra) =>
        palavra.length === 0
          ? palavra
          : palavra[0].toUpperCase() + palavra.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  contarOcorrencias(texto, substring) {
    if (!substring) return 0;
    return texto.split(substring).length - 1;
  }

  removerEspacosExtras(texto) {
    return texto.trim().replace(/\s+/g, " ");
  }

  paraSlug(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  truncar(texto, tamanho) {
    if (tamanho < 0) {
      throw new Error("O tamanho não pode ser negativo");
    }
    if (texto.length <= tamanho) return texto;
    return texto.slice(0, tamanho) + "...";
  }

  contarPalavras(texto) {
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    return palavras.length;
  }

  somenteLetras(texto) {
    return /^[a-zA-ZÀ-ÿ]+$/.test(texto);
  }

  substituirTudo(texto, alvo, substituto) {
    if (!alvo) {
      throw new Error("O alvo não pode ser vazio");
    }
    return texto.split(alvo).join(substituto);
  }
}

module.exports = TextoUtils;