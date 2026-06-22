# AGENTS.md — Portfólio Imobiliário

## Visão Geral

Este projeto é um **portfólio de 7 templates de sites vitrine** para uma mesma imobiliária. Cada template possui layout e identidade visual distintos, mas compartilham o mesmo conteúdo (nome, imóveis, informações de contato).

**Stack principal:**
- **Angular 19** — standalone components, router, bootstrapApplication
- **UIkit 3** (via CDN) — framework CSS primário
- **Feather Icons** (via CDN) — iconografia
- **TypeScript 5.7+** — strict mode habilitado

**Conteúdo compartilhado entre todos os templates:**
- **10 imóveis** no total
- **6 imóveis em destaque** na página home (alguns templates podem exibir menos)
- **Página de listagem** com todos os 10 imóveis (sem paginação)
- **Página de detalhe** individual para cada imóvel
- Informações de contato, termos de uso e política de privacidade

**Cada template possui 6 páginas:**
| Página | Rota |
|---|---|
| Home | `/template-0X` |
| Listagem de imóveis | `/template-0X/imoveis` |
| Detalhe do imóvel | `/template-0X/imovel/:id` |
| Contato | `/template-0X/contato` |
| Termos de uso | `/template-0X/termos` |
| Política de privacidade | `/template-0X/privacidade` |

---

## Organização do Projeto

```
portifolio-imob/
├── AGENTS.md                    # ← este arquivo
├── angular.json                 # Configuração do Angular CLI
├── package.json
├── tsconfig.json                # TypeScript strict config
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
│   └── favicon.ico
└── src/
    ├── index.html
    ├── main.ts                  # bootstrap da aplicação
    ├── styles.css               # estilos globais
    └── app/
        ├── app.component.ts     # componente raiz
        ├── app.component.html
        ├── app.component.css
        ├── app.component.spec.ts
        ├── app.config.ts        # providers globais (router, etc.)
        └── app.routes.ts        # definição de rotas
```

### Estrutura Planejada (após implementação dos templates)

```
src/
├── index.html
├── main.ts
├── styles.css
└── app/
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app.config.ts
    ├── app.routes.ts
    ├── pages/
    │   ├── home/                          # Vitrine dos 7 templates
    │   │   ├── home.component.ts
    │   │   ├── home.component.html
    │   │   └── home.component.css
    │   ├── template-01/                   # Template 1 (mini-site independente)
    │   │   ├── pages/
    │   │   │   ├── home/
    │   │   │   ├── imoveis/
    │   │   │   ├── imovel/
    │   │   │   ├── contato/
    │   │   │   ├── termos/
    │   │   │   └── privacidade/
    │   │   └── layout/                    # Header/footer específicos
    │   ├── template-02/                   # Template 2
    │   │   ├── pages/
    │   │   │   ├── home/
    │   │   │   ├── imoveis/
    │   │   │   ├── imovel/
    │   │   │   ├── contato/
    │   │   │   ├── termos/
    │   │   │   └── privacidade/
    │   │   └── layout/
    │   ├── template-03/ ... idem
    │   ├── template-04/ ... idem
    │   ├── template-05/ ... idem
    │   ├── template-06/ ... idem
    │   └── template-07/ ... idem
    ├── shared/                     # Componentes, serviços e dados compartilhados
    │   ├── data/
    │   │   └── imobiliaria.data.ts         # Dados da imobiliária (centralizado)
    │   ├── models/
    │   │   ├── imovel.model.ts             # Interface Imovel
    │   │   └── imobiliaria.model.ts        # Interface Imobiliaria
    │   └── components/
    │       └── property-card/              # Card de imóvel reutilizável
    └── layouts/                    # (reservado) Layouts base compartilhados
```

---

## Roteamento

### Estrutura de Rotas

```
/                          → Home do portfólio (vitrine dos 7 templates)
/template-01               → Home do Template 1
/template-01/imoveis       → Listagem dos 10 imóveis
/template-01/imovel/:id    → Detalhe do imóvel
/template-01/contato       → Página de contato
/template-01/termos        → Termos de uso
/template-01/privacidade   → Política de privacidade
/template-02/...           → Idem para Template 2
... até template-07
```

### Implementação

- **Lazy loading** — cada template é carregado sob demanda via `loadChildren`
- **Rotas filhas** — cada template define suas 6 rotas internas
- **Parâmetro `:id`** — o detalhe do imóvel recebe o ID por parâmetro de rota
- **Cada template é independente** — sem conflito de CSS ou layout entre eles

---

## Modelo de Dados

### Imovel

```typescript
interface Imovel {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  metragem: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  tipo: 'casa' | 'apartamento' | 'comercial' | 'terreno';
  finalidade: 'venda' | 'aluguel';
  endereco: string;
  cidade: string;
  estado: string;
  fotos: string[];       // URLs das imagens
  destaque: boolean;     // true = aparece na home
  area: number;          // área total em m²
  condominio?: number;   // valor do condomínio (se aplicável)
}
```

### Imobiliaria

```typescript
interface Imobiliaria {
  nome: string;
  logo: string;
  slogan: string;
  telefone: string;
  email: string;
  endereco: string;
  redesSociais: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    whatsapp?: string;
  };
  sobre: string;
}
```

---

## Bibliotecas e Dependências

### Produção

| Biblioteca | Versão | Uso |
|---|---|---|
| `@angular/core` | ^19.2.0 | Framework core |
| `@angular/router` | ^19.2.0 | Roteamento SPA |
| `@angular/forms` | ^19.2.0 | Formulários |
| `@angular/common` | ^19.2.0 | Diretivas comuns |
| `@angular/platform-browser` | ^19.2.0 | Renderização browser |
| `rxjs` | ~7.8.0 | Programação reativa |
| `zone.js` | ~0.15.0 | Change detection |

### CDN (não via npm)

| Biblioteca | Inclusão | Finalidade |
|---|---|---|
| **UIkit 3** | `index.html` via `<link>` + `<script>` | Framework CSS principal — grid, componentes, utilitários |
| **Feather Icons** | `index.html` via `<script>` | Ícones vetoriais leves |

**UIkit 3 (CDN):**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.23.13/css/uikit.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.23.13/js/uikit.min.js"></script>
```

**Feather Icons (CDN):**
```html
<script src="https://unpkg.com/feather-icons"></script>
```

### Desenvolvimento

| Biblioteca | Versão | Uso |
|---|---|---|
| `typescript` | ~5.7.2 | TypeScript strict |
| `@angular/cli` | ^19.2.26 | Angular CLI |
| `jasmine-core` | ~5.6.0 | Testes unitários |
| `karma` | ~6.4.0 | Test runner |

---

## Skills do OpenCode Disponíveis

### Skills Locais (na raiz do projeto)

Atualmente nenhuma skill local está configurada. Skills personalizadas podem ser adicionadas em `.opencode/skills/` ou referenciadas via path absoluto.

### Skills Globais (`~/.agents/skills/`)

| Skill | Descrição | Quando usar |
|---|---|---|
| **brainstorming** | Explora requisitos e design antes da implementação | **Sempre antes de qualquer trabalho criativo** — explorar layouts, definir identidade visual, planejar features |
| **frontend-design** | Cria interfaces frontend com alta qualidade de design | **Criar/estilizar páginas e componentes** — gera código HTML/CSS/TS polido com UI design diferenciado |
| **copywriting** | Escreve/reescreve copy de marketing | Quando precisar de textos persuasivos para hero sections, CTAs, descrições de imóveis |
| **docs** (documentation) | Gera README, documentação de API, guias | Documentar o projeto, templates e decisões |
| **find-skills** | Descobre skills para necessidades específicas | Explorar skills existentes para resolver problemas |

### Skills Globais (`~/.config/opencode/skills/`)

| Skill | Descrição | Quando usar |
|---|---|---|
| **backend-dev** | Lógica server-side, APIs, banco de dados | (Reservado para futura expansão com backend) |
| **code-review** | Revisão de código estruturada | Antes de finalizar PRs ou entregas |
| **frontend-dev** | UI components, pages, layouts | Construção de componentes Angular seguindo o design definido |
| **planning** | Arquitetura de sistema, contratos de dados | Definir estrutura de dados, padrões de componentes, fluxos de navegação |
| **security-audit** | Revisão de vulnerabilidades, autenticação | Verificar segurança (OWASP Top 10) |
| **testing** | Testes unitários, integração, e2e | Escrever/verificar testes |

### Orquestração Recomendada (DevSage)

Para cada template ou feature nova, seguir este fluxo:

1. **brainstorming** → Explorar requisitos visuais e funcionais, obter aprovação do design
2. **frontend-design** → Criar o componente/layout com UI design de alta qualidade usando UIkit + Feather
3. **code-review** → Revisar qualidade e consistência do código
4. **(opcional) testing** → Adicionar testes
5. **docs** → Documentar o template criado

---

## Convenções de Código

- **Standalone components** — sem NgModules
- **Lazy loading** — cada template é uma rota lazy independente
- **Rotas filhas** — cada template usa `children` para suas 6 páginas
- **UIkit classes** — utilizar classes utilitárias do UIkit (`uk-container`, `uk-grid`, `uk-card`, etc.)
- **Feather Icons** — chamar `feather.replace()` após cada mudança de rota ou template
- **Dados centralizados** — toda informação da imobiliária em `shared/data/imobiliaria.data.ts`
- **TypeScript strict** — seguir as regras do `strict: true` no tsconfig
- **Cada template isolado** — sem vazamento de CSS entre templates (ViewEncapsulation.Emulated por padrão)

---

## Ambiente

- **Node**: gerenciado via nvm (`.nvmrc` a definir)
- **Dev server**: `ng serve` — padrão porta 4200
- **Build**: `ng build` — output em `dist/portifolio-imob`
- **Test**: `ng test` — Karma + Jasmine

---

## Comandos Úteis

```bash
# Desenvolvimento
npm start              # ng serve

# Build
npm run build          # ng build (produção)

# Testes
npm test               # ng test

# Criar template (componente + rotas)
ng generate component pages/template-XX --standalone
ng generate component pages/template-XX/pages/home --standalone
ng generate component pages/template-XX/pages/imoveis --standalone
ng generate component pages/template-XX/pages/imovel --standalone
ng generate component pages/template-XX/pages/contato --standalone
ng generate component pages/template-XX/pages/termos --standalone
ng generate component pages/template-XX/pages/privacidade --standalone

# Criar serviço de dados
ng generate service shared/data/imobiliaria
```
