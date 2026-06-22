# Spec: Template 01 — Visa Imóveis

## 1. Visão Geral

**Template 01** é o primeiro dos 7 layouts de site vitrine para a **Visa Empreendimentos Imobiliários**. Este template estabelece o tom do portfólio com um design **sóbrio, sofisticado e acolhedor**, combinando uma paleta de tons profundos (navy, terracota e dourado) com animações suaves e tipografia de impacto.

> **Inspiração:** O site [sibeleimoveis.com.br](https://sibeleimoveis.com.br/) serviu como referência de funcionalidades e fluxo, mas **não copiamos o design visual**. Este template aposta numa identidade própria com cores quentes, texturas sutis e uma atmosfera mais residencial/acolhedora.

### Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Angular 19 | ^19.2.0 | Framework base (standalone) |
| UIkit 3 | 3.23.13 (CDN) | Grid, cards, utilitários |
| Feather Icons | via CDN | Iconografia |
| CSS Custom Properties | — | Design tokens (cores, fontes, sombras) |

### Skill Responsável

**`frontend-design`** (skill global em `~/.agents/skills/frontend-design/`) — Esta skill deve ser carregada antes da implementação para garantir:
- Escolha tipográfica diferenciada (evitar Inter, Roboto, Arial)
- Paleta de cores coesa e memorável
- Animações e micro-interações de alto impacto
- Composições espaciais criativas (assimetria, sobreposição)

---

## 2. Estrutura do Template

```
src/app/pages/template-01/
├── template-01.routes.ts          # Rotas do template (lazy)
├── layout/
│   ├── header.component.ts         # Topbar + Navegação principal
│   ├── header.component.html
│   ├── header.component.css
│   ├── footer.component.ts         # Rodapé completo
│   ├── footer.component.html
│   └── footer.component.css
├── pages/
│   ├── home/
│   │   ├── home.component.ts       # Página principal (home)
│   │   ├── home.component.html
│   │   └── home.component.css
│   ├── imoveis/
│   │   ├── imoveis.component.ts     # Listagem de imóveis
│   │   ├── imoveis.component.html
│   │   └── imoveis.component.css
│   ├── imovel/
│   │   ├── imovel.component.ts      # Detalhe do imóvel
│   │   ├── imovel.component.html
│   │   └── imovel.component.css
│   ├── contato/
│   │   ├── contato.component.ts     # Página de contato
│   │   ├── contato.component.html
│   │   └── contato.component.css
│   ├── termos/
│   │   └── ...
│   └── privacidade/
│       └── ...
└── components/
    ├── whatsapp-button/
    │   ├── whatsapp-button.component.ts
    │   ├── whatsapp-button.component.html
    │   └── whatsapp-button.component.css
    └── property-card/
        ├── property-card.component.ts
        ├── property-card.component.html
        └── property-card.component.css
```

---

## 3. Design System (Design Tokens)

### Paleta de Cores

```css
:root {
  /* Primárias */
  --color-primary: #1B2A4A;        /* Navy profundo */
  --color-primary-light: #2C3F66;  /* Navy claro */
  --color-primary-dark: #0F1A30;   /* Navy escuro */

  /* Secundária / Accent */
  --color-accent: #C97B5D;         /* Terracota */
  --color-accent-light: #D99B7A;   /* Terracota claro */
  --color-accent-dark: #A85E44;    /* Terracota escuro */

  /* Dourado (detalhes) */
  --color-gold: #C9A96E;
  --color-gold-light: #DFC08A;

  /* Neutros */
  --color-white: #FFFFFF;
  --color-bg: #F8F6F3;             /* Off-white quente */
  --color-bg-alt: #EDE8E3;         /* Bege claro */
  --color-text: #2D2D2D;
  --color-text-light: #6B6B6B;
  --color-border: #E0D8D0;

  /* Feedback */
  --color-success: #4CAF50;
  --color-error: #D32F2F;
}
```

### Tipografia

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

| Nível | Fonte | Tamanho | Peso | Uso |
|---|---|---|---|---|
| H1 | Playfair Display | 3.5rem → 2rem (mobile) | 700 | Hero title |
| H2 | Playfair Display | 2.5rem → 1.75rem | 600 | Section titles |
| H3 | Playfair Display | 1.5rem | 600 | Card titles |
| Body | Lato | 1rem | 400 | Texto corrido |
| Small | Lato | 0.875rem | 400 | Legendas |
| Label | Lato | 0.8rem | 700 | Labels/badges |

### Sombras e Elevação

```css
:root {
  --shadow-sm: 0 1px 3px rgba(27, 42, 74, 0.08);
  --shadow-md: 0 4px 12px rgba(27, 42, 74, 0.12);
  --shadow-lg: 0 8px 30px rgba(27, 42, 74, 0.18);
  --shadow-xl: 0 20px 60px rgba(27, 42, 74, 0.25);
  --shadow-glow: 0 0 20px rgba(201, 123, 93, 0.3);
}
```

### Transições

```css
:root {
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms cubic-bezier(0.22, 1, 0.36, 1);
  --transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 4. Home Page — Seções (Ordem de Apresentação)

A página home segue uma **narrativa de consumo**: apresentação → conveniência → prova social → imóveis → contato.

### 4.1 Hero Section (Full-Screen)

**Layout:**
- Banner em tela cheia (100vh) com imagem de fundo em **parallax suave**
- Overlay gradiente ( navy → transparent, 60% )
- Título principal em Playfair Display, branco, com **reveal animation** (fade-up)
- Subtítulo descritivo
- CTA button "Ver Imóveis" com seta animada
- Indicador de scroll (seta pulsando no final da tela)

**Imagens de banner (Unsplash, rotativas):**
```
https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80
https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80
https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80
```

**Animações:**
- Background com **ken-burns zoom** lento (10s infinito)
- Título entra com **fade-in-up** (0.6s delay)
- Subtítulo entra com **fade-in-up** (0.9s delay)
- CTA pulse suave no hover
- Scroll-down arrow bounce infinito

### 4.2 Search Bar Section (Busca Rápida)

**Layout:**
- Barra de busca estilizada, posicionada logo abaixo do hero ou sobrepondo o final dele (negativo margin-top)
- Card com sombra, cantos arredondados, fundo branco
- Campos lado a lado (responsivo): Tipo, Cidade, Finalidade, Quartos
- Botão "Buscar" no accent color

**Interações:**
- Dropdowns com UIkit (uk-select)
- Transição suave ao focar campos
- Ao submeter, navega para `/template-01/imoveis` com query params

### 4.3 Diferenciais / Valores (3 Cards)

**Layout:**
- Seção de fundo bege claro
- 3 cards horizontais/icônicos lado a lado com ícones Feather:
  1. **Atendimento Personalizado** — Ícone de headset/user-check
  2. **Imóveis Premium** — Ícone de home/star
  3. **Suporte Completo** — Ícone de shield/clock
- Cada card com ícone grande, título, descrição curta

**Animações:**
- Cards entram com **staggered fade-up** (atrasos 0.2s, 0.4s, 0.6s)
- Ícones com **hover scale** sutil
- Borda inferior animada no hover (expande da esquerda)

### 4.4 Imóveis em Destaque

**Layout:**
- Título da seção: "Imóveis em Destaque" com subtítulo
- **Grid 3 colunas** (2 tablets, 1 mobile) de property cards
- Cada card contém:
  - Imagem (16:9) com overlay de preço
  - Badge "Destaque" ou "Lançamento"
  - Título, endereço
  - Ícones: quartos, banheiros, área
  - Link "Ver detalhes"
- Botão "Ver Todos" no final

**Property Card (componente reutilizável `shared/components/property-card/`):**

```html
<div class="property-card">
  <div class="property-card__image">
    <img [src]="imovel.fotos[0]" [alt]="imovel.titulo" loading="lazy" />
    <span class="property-card__price">{{ imovel.preco | currency }}</span>
    <span class="property-card__badge" *ngIf="imovel.destaque">Destaque</span>
  </div>
  <div class="property-card__body">
    <h3>{{ imovel.titulo }}</h3>
    <p class="property-card__location">
      <i data-feather="map-pin"></i> {{ imovel.cidade }}, {{ imovel.estado }}
    </p>
    <div class="property-card__features">
      <span><i data-feather="bed"></i> {{ imovel.quartos }}</span>
      <span><i data-feather="shower"></i> {{ imovel.banheiros }}</span>
      <span><i data-feather="maximize"></i> {{ imovel.area }}m²</span>
    </div>
    <a [routerLink]="'/template-01/imovel/' + imovel.id" class="property-card__link">
      Ver Detalhes <i data-feather="arrow-right"></i>
    </a>
  </div>
</div>
```

**Animações:**
- Cards com **reveal-on-scroll** (interseção observer)
- Imagem com **zoom hover** (scale 1.05)
- Sombra eleva no hover (--shadow-sm → --shadow-lg)
- Preço aparece com fade-in

### 4.5 Parceiros / Selos de Confiança

**Layout:**
- Seção clara com título "Parceiros e Certificações"
- **Carrossel horizontal** de logos parceiros (CRECI, CAU, Conselho Federal, etc.)
- Logos em tons de cinza que colorizam no hover
- Autoplay suave com pausa no hover

**Implementação:**
- Usar UIkit slider (`uk-slider`) para o carrossel
- Ou CSS scroll puro com `overflow-x: auto` + scroll snap

### 4.6 Contato / CTA

**Layout:**
- Seção de fundo navy escuro (--color-primary)
- Layout 2 colunas: formulário de contato + informações
- Formulário: nome, email, telefone, mensagem
- Informações: endereço, telefones, email com ícones Feather
- Título em branco: "Vamos conversar?"
- Botão de envio no accent color

**Animações:**
- Background com pattern geométrico sutil (CSS puro)
- Campos com **focus glow** (sombra dourada)
- Botão com **hover fill** animation
- Toast de sucesso ao enviar (simulação)

### 4.7 Footer

**Layout:**
- 4 colunas (responsivo):
  1. Logo + breve descrição + redes sociais
  2. Links rápidos (Páginas internas)
  3. Imóveis (tipos)
  4. Contato
- Linha divisória dourada
- Copyright bar: "© 2024 Visa Imóveis. Todos os direitos reservados."

### 4.8 WhatsApp Floating Button

**Layout:**
- Botão circular fixo no canto inferior direito
- Ícone do WhatsApp (Feather ou SVG)
- Tooltip "Fale conosco" no hover
- Badge de notificação opcional

**Animações:**
- **Pulse infinito** suave (ring expansion)
- **Slide-in** ao carregar a página (entra da direita)
- **Hover scale** 1.1
- Clica: abre `https://wa.me/5565999545667`

```css
.whatsapp-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  animation: whatsapp-slide-in 0.6s ease-out, whatsapp-pulse 2s infinite 1s;
}

@keyframes whatsapp-slide-in {
  from { transform: translateX(100px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes whatsapp-pulse {
  0%   { box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); }
  50%  { box-shadow: 0 4px 25px rgba(37, 211, 102, 0.7); }
  100% { box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); }
}
```

---

## 5. Páginas Internas

### 5.1 Listagem de Imóveis (`/template-01/imoveis`)

- Filtros persistidos no topo (igual search da home)
- Grid de 10 cards (3 colunas desktop, 2 tablet, 1 mobile)
- Sem paginação (todos visíveis)
- Ordenação: destaque primeiro, depois por preço
- Load mais imagens com lazy loading

### 5.2 Detalhe do Imóvel (`/template-01/imovel/:id`)

- Galeria de imagens com slider (UIkit slideshow)
- Informações do imóvel: preço, área, quartos, banheiros, vagas
- Descrição completa
- Botão "Agendar Visita" → WhatsApp
- Mapa estático (placeholder)
- Imóveis relacionados (grid pequeno)

### 5.3 Contato (`/template-01/contato`)

- Mesmo layout da seção de contato da home
- Google Maps iframe embed
- Redes sociais destacadas

### 5.4 Termos / Privacidade

- Conteúdo textual estilizado com tipografia limpa
- Hierarquia clara (h1, h2, p, ul)
- Links internos no topo (âncora)

---

## 6. Animações Globais

| Animação | Tipo | Gatilho | Elementos |
|---|---|---|---|
| Reveal-on-scroll | fade-up + translateY(30px) → 0 | Intersection Observer (threshold 0.15) | Seções, cards, títulos |
| Staggered fade | fade-up com delay incremental | Pai com `animation-delay` filhos | Grids de cards |
| Hover zoom | scale(1.05) + shadow | Hover | Property cards, imagens |
| Smooth scroll | scroll-behavior: smooth | Navegação interna | Âncoras |
| Parallax | background-attachment: fixed | Scroll | Hero banner |
| Ken Burns | scale(1.1) slow pan | Page load | Hero background image |

### Implementação do Reveal-on-Scroll

Usar **Intersection Observer API** via diretiva Angular personalizada ou serviço simples:

```typescript
// shared/directives/reveal.directive.ts
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() delay = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', `all 0.6s ease ${this.delay}ms`);

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
        this.observer.disconnect();
      }
    }, { threshold: 0.15 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
```

---

## 7. Imagens de Banner (Unsplash)

As imagens abaixo foram validadas (HTTP 200) e devem ser usadas no hero e cards:

| Uso | URL | Resolução |
|---|---|---|
| Hero banner 1 | `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80` | 1600px |
| Hero banner 2 | `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80` | 1600px |
| Hero banner 3 | `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80` | 1600px |
| Card 1 | `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80` | 800px |
| Card 2 | `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80` | 800px |
| Card 3 | `https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80` | 800px |
| Card 4 | `https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80` | 800px |
| Card 5 | `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80` | 800px |
| Card 6 | `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80` | 800px |

---

## 8. Integrações

### Feather Icons

Chamar `feather.replace()` no `ngAfterViewInit` de cada página e no `ngOnInit` do header/footer. Criar um serviço ou diretiva para automatizar.

```typescript
// shared/services/feather.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatherService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  replace(): void {
    // Executa feather.replace() via window
    const script = this.renderer.createElement('script');
    script.textContent = 'if (window.feather) feather.replace()';
    this.renderer.appendChild(document.body, script);
    this.renderer.removeChild(document.body, script);
  }
}
```

### UIkit

UIkit deve ser carregado via CDN no `index.html`. Para componentes que usam UIkit JS (slider, slideshow, lightbox), chamar `UIkit.refresh()` no `ngAfterViewInit`.

---

## 9. Observações Técnicas

### Lazy Loading

```typescript
// app.routes.ts
{
  path: 'template-01',
  loadChildren: () => import('./pages/template-01/template-01.routes')
    .then(m => m.template01Routes)
}
```

### Rotas do Template

```typescript
export const template01Routes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      { path: '', component: HomeComponent },
      { path: 'imoveis', component: ImoveisComponent },
      { path: 'imovel/:id', component: ImovelComponent },
      { path: 'contato', component: ContatoComponent },
      { path: 'termos', component: TermosComponent },
      { path: 'privacidade', component: PrivacidadeComponent },
    ],
  },
];
```

### Acessibilidade

- Contraste mínimo 4.5:1 (verificado)
- Skip-to-content link
- Alt text em todas as imagens
- ARIA labels nos ícones e botões
- Navegação por teclado nos filtros

### Performance

- Lazy loading de imagens (loading="lazy")
- Reveal-on-scroll com IntersectionObserver (não bibliotecas pesadas)
- Feather Icons via CDN com cache
- UIkit via CDN com cache

---

## 10. Critérios de Aceitação

- [ ] Home page com hero parallax + animações + CTA
- [ ] Search bar funcional navegando para listagem
- [ ] 3 cards de diferenciais com staggered animation
- [ ] Grid de imóveis em destaque (6) com reveal-on-scroll
- [ ] Carrossel de parceiros funcional
- [ ] Seção de contato com formulário + info
- [ ] Footer completo com 4 colunas
- [ ] WhatsApp button flutuante com pulse animation
- [ ] Listagem de 10 imóveis com filtros
- [ ] Detalhe do imóvel com galeria de fotos
- [ ] Páginas de termos e privacidade
- [ ] Feather Icons funcionando após cada navegação
- [ ] UIkit componentes funcionais (slider, cards, grid)
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Performance: sem bibliotecas JS pesadas para animações

---

## 11. Ordem de Implementação Sugerida

| Fase | O que | Depende de |
|---|---|---|
| 1 | Models + Services (já criados) | — |
| 2 | Rotas lazy + estrutura de pastas | — |
| 3 | Layout (header, footer, whatsapp-button) | Fase 2 |
| 4 | Shared property-card component | Fase 2 |
| 5 | Home page (hero, search, diferenciais, destaques, parceiros, contato) | Fases 3, 4 |
| 6 | Página de listagem de imóveis | Fase 4 |
| 7 | Página de detalhe do imóvel | Fase 4 |
| 8 | Página de contato | Fase 3 |
| 9 | Termos e privacidade | Fase 3 |
| 10 | Animações globais (reveal directive) | Fase 5 |
| 11 | Revisão final + testes | Todas |

---

*Spec preparada para implementação com a skill `frontend-design` para garantir qualidade visual e distinção estética.*
