# Portfólio Imobiliário — Visa Imóveis

Este projeto é um portfólio de templates de sites vitrine para imobiliárias. Cada template compartilha o mesmo conjunto de imóveis e dados da imobiliária, mas possui identidade visual, layout e experiência próprios.

## Template 01 — Visa Imóveis

O **Template 01** é o primeiro layout do portfólio, projetado com um design sóbrio, sofisticado e acolhedor, combinando tons profundos de navy, terracota e dourado com animações suaves e tipografia de impacto.

### Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| Angular 19 | Framework SPA com standalone components |
| UIkit 3.23.13 | Grid, cards, slider, slideshow (via CDN) |
| Feather Icons | Iconografia vetorial leve (via CDN) |
| CSS Custom Properties | Design tokens de cores, tipografia, sombras e transições |
| Google Fonts | Playfair Display (títulos) + Lato (corpo) |

### Estrutura de Pastas

```
src/app/pages/template-01/
├── template-01.routes.ts          # Rotas lazy do template
├── layout/
│   ├── header.component.ts         # Topbar + navegação responsiva
│   └── footer.component.ts         # Rodapé 4 colunas
├── components/
│   ├── whatsapp-button/            # Botão flutuante do WhatsApp
│   └── property-card/              # Card reutilizável de imóvel
└── pages/
    ├── home/                       # Hero, busca, diferenciais, destaques, parceiros, contato
    ├── imoveis/                    # Listagem com filtros
    ├── imovel/                     # Detalhe com galeria UIkit
    ├── contato/                    # Formulário + mapa + informações
    ├── termos/                     # Termos de uso
    └── privacidade/                # Política de privacidade
```

### Rotas

| Rota | Página |
|---|---|
| `/template-01` | Home |
| `/template-01/imoveis` | Listagem de imóveis |
| `/template-01/imovel/:id` | Detalhe do imóvel |
| `/template-01/contato` | Contato |
| `/template-01/termos` | Termos de uso |
| `/template-01/privacidade` | Política de privacidade |

### Componentes e Serviços Compartilhados

- `FeatherService` — encapsula `feather.replace()` para re-renderizar ícones após navegação SPA.
- `RevealDirective` — animação fade-up ao scroll via IntersectionObserver.
- `ImovelService` — fornece 10 imóveis estáticos (6 em destaque).
- `SiteService` — fornece dados da imobiliária (nome, contato, redes sociais).

### Design System

- **Cores primárias:** navy `#1B2A4A`, navy-light `#2C3F66`, navy-dark `#0F1A30`
- **Accent:** terracota `#C97B5D`
- **Detalhes:** dourado `#C9A96E`
- **Neutros:** off-white `#F8F6F3`, bege `#EDE8E3`
- **Tipografia:** Playfair Display para títulos, Lato para corpo

### Animações

- Reveal-on-scroll nos cards e seções
- Ken Burns no background do hero
- Parallax suave em desktop
- Staggered fade-up nos diferenciais
- Pulse contínuo no botão flutuante do WhatsApp
- Hover zoom nos property cards

## Desenvolvimento

### Servidor de desenvolvimento

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

> **Nota de ambiente:** A suíte de testes utiliza o launcher do Chrome (`karma-chrome-launcher`). No ambiente atual o binário do Chrome/Chromium não está disponível, portanto os testes unitários não puderam ser executados automaticamente. O build de produção (`ng build`) é executado com sucesso e sem erros de compilação.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
