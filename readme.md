<p align="center">
  <img src="./docs/assets/mantra-logo-default.png" alt="Mantra | Logo" width="300" />
  <br>
  <small>
    Se adapta. Se transforma. Se conecta.
  </small>
</p>

## ✨ Visão Geral

Biblioteca de componentes web desenvolvida com StencilJS para criar interfaces reutilizáveis e performáticas em diferentes frameworks e projetos.

A proposta do Mantra é fornecer componentes encapsulados e flexíveis que possam ser facilmente integrados em aplicações baseadas em tecnologias como Angular, React, Vue e até mesmo projetos standalone com JavaScript puro.

## 🚀 Principais Recursos

- Componentes Web Reutilizáveis: Criados com StencilJS, garantindo compatibilidade com diversos frameworks.

- Escrito em TypeScript: Segurança e tipagem forte para facilitar manutenção.

- Suporte a Storybook: Visualização e testes interativos dos componentes.

- Estilização com SCSS: Utilizando @stencil/sass para maior flexibilidade.

- Testes Automatizados: Inclui Jest e Puppeteer para testes unitários e e2e.

## 📦 Instalação

Você pode instalar o Mantra via github packages:

```bash
npm install mantra
```

## 🔧 Uso

Importe e utilize um componente diretamente no seu projeto:

```html
<script type="module" src="node_modules/mantra/dist/mantra/mantra.esm.js"></script>

<yoo-button label="Clique Aqui"></yoo-button>
```

Se estiver utilizando um framework como React ou Angular, verifique a documentação oficial para integração com StencilJS.

## 📖 Documentação

Para mais detalhes sobre cada componente e suas propriedades, consulte a documentação oficial no Storybook:

📚 Mantra UI Storybook

📜 Scripts Disponíveis

O projeto inclui diversos comandos para facilitar o desenvolvimento e testes:

```bash
npm run build           # Compila os componentes
npm run start           # Inicia o servidor de desenvolvimento
npm run test            # Executa os testes unitários
npm run test:e2e        # Executa os testes end-to-end
npm run storybook       # Inicia o Storybook para visualizar os componentes
npm run build-storybook # Gera a versão estática do Storybook
```

## 🛠 Tecnologias Utilizadas

- StencilJS
- Storybook
- SCSS
- Jest
- Puppeteer

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga as diretrizes no arquivo CONTRIBUTING.md para mais informações.

## 📩 Contato

Se tiver dúvidas ou sugestões, entre em contato pelo GitHub Issues.
