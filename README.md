# Abrigo de Animais 🐾

![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=000)
![Node >= 20](https://img.shields.io/badge/Node-%3E%3D%2020-339933?logo=node.js&logoColor=fff)
![Jest](https://img.shields.io/badge/Jest-99424f?logo=jest&logoColor=fff)

Solução em **JavaScript** para parear pessoas e animais conforme a **ordem dos brinquedos favoritos** e regras do enunciado.  
A lógica está no método `encontraPessoas` da classe `AbrigoAnimais`.

> Export exigido:
> ```js
> export { AbrigoAnimais as AbrigoAnimais };
> ```

---

## Requisitos
- Node.js **20+**
- npm

## Instalação
```bash
npm install
npm test
.
├─ src/
│  ├─ abrigo-animais.js      # implementação
│  └─ abrigo-animais.test.js # testes base
├─ package.json
├─ jest.config.js
└─ README.md

