import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from 'src/utils/utils';

interface FilterSearchProps {
  name?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  state?: 'default' | 'error' | 'success';
  value?: string;
}

const sizeVariants = ['small', 'medium', 'large'] as const;
const stateVariants = ['default', 'error', 'success'] as const;

const meta: Meta<FilterSearchProps> = {
  title: 'Forms/FilterSearch',
  component: 'mnt-filter-search',
  argTypes: {
    name: { control: 'text', description: 'Nome do input (atributo name)' },
    placeholder: { control: 'text', description: 'Placeholder do input' },
    size: {
      control: 'select',
      options: sizeVariants,
      description: 'Tamanho do campo',
      table: { defaultValue: { summary: 'medium' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Campo ocupa 100% da largura do container',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Campo desabilitado',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório',
      table: { defaultValue: { summary: 'false' } },
    },
    state: {
      control: 'select',
      options: stateVariants,
      description: 'Estado visual do campo',
      table: { defaultValue: { summary: 'default' } },
    },
    value: {
      control: 'text',
      description: 'Valor atual do campo',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **mnt-filter-search** é um campo de busca especializado para filtrar listas e conteúdos.

### 🎯 Características principais:

- **Ícone Dinâmico**: Alterna entre lupa (busca) e X (limpar) conforme o usuário digita
- **Eventos Duais**: \`valueChange\` (tempo real) e \`filterApplied\` (no blur)
- **Clear Button**: Botão para limpar o campo com um clique
- **Responsivo**: Adapta-se a diferentes tamanhos (small, medium, large)
- **Full Width**: Opção para ocupar 100% da largura disponível
- **Acessível**: Atributos HTML nativos (name, required, disabled, autocomplete)

### 📖 Como usar:

\`\`\`html
<mnt-filter-search
  name="productSearch"
  placeholder="Buscar produtos..."
  size="medium"
  full-width
></mnt-filter-search>
\`\`\`

### 🔄 Diferença entre eventos:

- **valueChange**: Dispara a cada caractere digitado (onInput)
  - Use para: feedback visual em tempo real, contadores de caracteres
  - ⚠️ Cuidado: Pode gerar muitas chamadas se houver requisições HTTP

- **filterApplied**: Dispara quando o usuário sai do campo (onBlur) ou limpa (onClear)
  - Use para: aplicar filtros, fazer requisições ao servidor
  - ✅ Recomendado: Para operações custosas ou requisições HTTP

### 🚀 Uso em Angular:

**⚠️ Importante:** Em Angular, use **kebab-case** para atributos HTML e **camelCase** para property binding.

#### Exemplo Básico - Filtrar Lista

\`\`\`typescript
// component.ts
import { Component } from '@angular/core';

interface Voucher {
  id: number;
  name: string;
  discount: number;
}

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html'
})
export class VoucherListComponent {
  availableVoucherList: Voucher[] = [
    { id: 1, name: 'DESCONTO10', discount: 10 },
    { id: 2, name: 'DESCONTO20', discount: 20 },
    { id: 3, name: 'FRETEGRATIS', discount: 0 },
    { id: 4, name: 'PRIMCOMPRA', discount: 15 }
  ];

  availableVoucherListFiltered: Voucher[] = [...this.availableVoucherList];
  hasFilterApplied: boolean = false;

  handleSearch(event: any): void {
    const value = event.detail.value.toUpperCase();

    if (value) {
      this.availableVoucherListFiltered = this.availableVoucherList
        .filter(voucher => voucher.name.includes(value));
      this.hasFilterApplied = true;
    } else {
      this.availableVoucherListFiltered = [...this.availableVoucherList];
      this.hasFilterApplied = false;
    }
  }

  clearFilter(): void {
    // Acessa o componente e limpa programaticamente
    const searchInput = document.querySelector('mnt-filter-search') as any;
    if (searchInput) {
      searchInput.value = '';
    }
    this.availableVoucherListFiltered = [...this.availableVoucherList];
    this.hasFilterApplied = false;
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<!-- Usando atributos HTML (kebab-case): -->
<div class="search-container">
  <mnt-filter-search
    size="medium"
    full-width
    class="w-100"
    placeholder="Buscar por cupom..."
    (filterApplied)="handleSearch($event)"
    name="voucher-search-input"
  ></mnt-filter-search>

  <div *ngIf="hasFilterApplied" class="filter-status">
    {{ availableVoucherListFiltered.length }} cupons encontrados
    <button (click)="clearFilter()">Limpar filtro</button>
  </div>
</div>

<ul class="voucher-list">
  <li *ngFor="let voucher of availableVoucherListFiltered">
    <strong>{{ voucher.name }}</strong>
    <span>{{ voucher.discount }}% de desconto</span>
  </li>
</ul>

<!-- OU usando property binding (camelCase): -->
<mnt-filter-search
  [size]="'medium'"
  [fullWidth]="true"
  [placeholder]="'Buscar por cupom...'"
  (filterApplied)="handleSearch($event)"
  [name]="'voucher-search-input'"
></mnt-filter-search>
\`\`\`

#### Filtro em Tempo Real com Debounce

\`\`\`typescript
// component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  products = [...]; // sua lista de produtos
  filteredProducts = [...this.products];

  ngOnInit(): void {
    // Aplica filtro com debounce de 300ms
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.applyFilter(searchTerm);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Escuta valueChange para filtro em tempo real
  handleValueChange(event: any): void {
    this.searchSubject.next(event.detail.value);
  }

  // Escuta filterApplied para confirmar filtro
  handleFilterApplied(event: any): void {
    console.log('Filtro aplicado:', event.detail.value);
  }

  private applyFilter(searchTerm: string): void {
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<mnt-filter-search
  placeholder="Buscar produtos..."
  size="medium"
  full-width
  (valueChange)="handleValueChange($event)"
  (filterApplied)="handleFilterApplied($event)"
></mnt-filter-search>
\`\`\`

#### Integração com HTTP Service

\`\`\`typescript
// component.ts
import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-server-search',
  templateUrl: './server-search.component.html'
})
export class ServerSearchComponent {
  products = [];
  isLoading = false;

  constructor(private productService: ProductService) {}

  async handleSearch(event: any): Promise<void> {
    const searchTerm = event.detail.value;

    if (!searchTerm) {
      this.products = [];
      return;
    }

    this.isLoading = true;

    try {
      // Faz requisição ao backend apenas no blur
      this.products = await this.productService
        .searchProducts(searchTerm)
        .toPromise();
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
\`\`\`

\`\`\`html
<!-- component.html -->
<mnt-filter-search
  placeholder="Buscar produtos no servidor..."
  size="medium"
  (filterApplied)="handleSearch($event)"
></mnt-filter-search>

<div *ngIf="isLoading">Carregando...</div>

<ul *ngIf="!isLoading && products.length > 0">
  <li *ngFor="let product of products">{{ product.name }}</li>
</ul>
\`\`\`

### 💡 Boas Práticas:

1. **Performance**: Use \`filterApplied\` para operações custosas
2. **UX**: Use \`valueChange\` apenas para feedback visual
3. **Debounce**: Implemente debounce se usar \`valueChange\` com requisições
4. **Acessibilidade**: Sempre defina um \`name\` e \`placeholder\` descritivos
5. **Feedback**: Mostre quantos itens foram encontrados
6. **Clear**: Forneça forma clara de limpar o filtro

### 🔗 Eventos Disponíveis:

| Evento | Quando dispara | Dados | Uso recomendado |
|--------|---------------|-------|------------------|
| \`valueChange\` | A cada caractere digitado | \`{ value: string }\` | Feedback visual, contadores |
| \`filterApplied\` | No blur ou clear | \`{ value: string }\` | Aplicar filtros, requisições HTTP |
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: FilterSearchProps): HTMLString => {
  return `
    <div style="padding: 20px; max-width: ${args.fullWidth ? '100%' : '400px'};">
      <mnt-filter-search
        name="${args.name || 'searchInput'}"
        placeholder="${args.placeholder || ''}"
        size="${args.size || 'medium'}"
        ${args.fullWidth ? 'full-width' : ''}
        ${args.disabled ? 'disabled' : ''}
        ${args.required ? 'required' : ''}
        state="${args.state || 'default'}"
        value="${args.value || ''}"
      ></mnt-filter-search>
    </div>
  `;
};

/**
 * Exemplo básico interativo do campo de busca
 */
export const Example = DefaultTemplate.bind({});
Example.args = {
  name: 'exampleSearch',
  placeholder: 'Buscar...',
  size: 'medium',
  fullWidth: false,
  disabled: false,
  required: false,
  state: 'default',
  value: '',
} as FilterSearchProps;
Example.parameters = {
  docs: {
    description: {
      story: 'Exemplo básico do campo de busca com todos os controles disponíveis. Digite para ver o ícone mudar de lupa para X.',
    },
  },
};

/**
 * Todos os tamanhos disponíveis
 */
export const AllSizes: StoryFn = () => `
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px;">
    <div>
      <h4 style="margin-bottom: 8px;">Small</h4>
      <mnt-filter-search
        name="searchSmall"
        placeholder="Buscar (small)..."
        size="small"
      ></mnt-filter-search>
    </div>
    <div>
      <h4 style="margin-bottom: 8px;">Medium (Default)</h4>
      <mnt-filter-search
        name="searchMedium"
        placeholder="Buscar (medium)..."
        size="medium"
      ></mnt-filter-search>
    </div>
    <div>
      <h4 style="margin-bottom: 8px;">Large</h4>
      <mnt-filter-search
        name="searchLarge"
        placeholder="Buscar (large)..."
        size="large"
      ></mnt-filter-search>
    </div>
  </div>
`;
AllSizes.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Demonstração de todos os tamanhos disponíveis: small, medium e large.',
    },
  },
};

/**
 * Campo com largura total
 */
export const FullWidth: StoryFn = () => `
  <div style="padding: 20px;">
    <h4 style="margin-bottom: 16px;">Full Width Search</h4>
    <mnt-filter-search
      name="fullWidthSearch"
      placeholder="Este campo ocupa 100% da largura disponível..."
      size="medium"
      full-width
    ></mnt-filter-search>

    <div style="margin-top: 20px; padding: 12px; background: #f0f0f0; border-radius: 6px;">
      <strong>Dica:</strong> Use <code>full-width</code> quando o campo deve ocupar toda a largura do container.
    </div>
  </div>
`;
FullWidth.parameters = {
  docs: {
    description: {
      story: 'Campo de busca configurado para ocupar 100% da largura do container pai.',
    },
  },
};

/**
 * Diferentes placeholders
 */
export const WithPlaceholder: StoryFn = () => `
  <div style="display: flex; flex-direction: column; gap: 16px; padding: 20px; max-width: 500px;">
    <mnt-filter-search
      placeholder="Buscar produtos..."
      size="medium"
      full-width
    ></mnt-filter-search>

    <mnt-filter-search
      placeholder="Filtrar por nome, CPF ou email..."
      size="medium"
      full-width
    ></mnt-filter-search>

    <mnt-filter-search
      placeholder="🔍 Pesquisar..."
      size="medium"
      full-width
    ></mnt-filter-search>
  </div>
`;
WithPlaceholder.parameters = {
  docs: {
    description: {
      story: 'Exemplos de diferentes placeholders para guiar o usuário.',
    },
  },
};

/**
 * Demonstração de eventos
 */
export const WithEvents: StoryFn = () => {
  setTimeout(() => {
    const searchField = document.getElementById('eventSearchField') as HTMLElement;
    const valueChangeOutput = document.getElementById('valueChangeOutput') as HTMLElement;
    const filterAppliedOutput = document.getElementById('filterAppliedOutput') as HTMLElement;

    let valueChangeCount = 0;
    let filterAppliedCount = 0;

    searchField?.addEventListener('valueChange', (e: CustomEvent) => {
      valueChangeCount++;
      valueChangeOutput.innerHTML = `
        <strong>valueChange #${valueChangeCount}:</strong> "${e.detail.value}"<br>
        <small>Disparado a cada caractere digitado</small>
      `;
      console.log('valueChange:', e.detail.value);
    });

    searchField?.addEventListener('filterApplied', (e: CustomEvent) => {
      filterAppliedCount++;
      filterAppliedOutput.innerHTML = `
        <strong>filterApplied #${filterAppliedCount}:</strong> "${e.detail.value}"<br>
        <small>Disparado no blur ou ao clicar no X</small>
      `;
      console.log('filterApplied:', e.detail.value);
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <mnt-filter-search
        id="eventSearchField"
        placeholder="Digite algo e tire o foco do campo..."
        size="medium"
        full-width
      ></mnt-filter-search>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
        <div id="valueChangeOutput" style="padding: 16px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3;">
          <strong>valueChange:</strong> Aguardando...
        </div>
        <div id="filterAppliedOutput" style="padding: 16px; background: #f3e5f5; border-radius: 6px; border-left: 4px solid #9c27b0;">
          <strong>filterApplied:</strong> Aguardando...
        </div>
      </div>

      <div style="margin-top: 16px; padding: 12px; background: #fff3cd; border-radius: 6px;">
        <strong>💡 Experimente:</strong><br>
        1. Digite alguns caracteres → veja o <code>valueChange</code> disparar<br>
        2. Clique fora do campo → veja o <code>filterApplied</code> disparar<br>
        3. Clique no X para limpar → ambos os eventos disparam
      </div>

      <small style="display: block; margin-top: 12px; color: #666;">
        Abra o console do navegador para ver todos os eventos sendo emitidos
      </small>
    </div>
  `;
};
WithEvents.parameters = {
  docs: {
    description: {
      story: `Demonstração dos eventos \`valueChange\` e \`filterApplied\`.

**valueChange**: Dispara a cada caractere digitado (tempo real)
**filterApplied**: Dispara no blur ou ao clicar no botão de limpar`,
    },
  },
};

/**
 * Campo de busca em um formulário
 */
export const InForm: StoryFn = () => {
  setTimeout(() => {
    const form = document.getElementById('searchForm') as HTMLFormElement;
    const output = document.getElementById('formOutput') as HTMLElement;

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = (document.getElementById('formSearchField') as any)?.value || '';

      output.innerHTML = `
        <strong>Formulário Enviado!</strong><br>
        Termo de busca: "${searchValue}"
      `;
    });
  }, 100);

  return `
    <div style="padding: 20px;">
      <form id="searchForm" style="max-width: 500px;">
        <h3 style="margin-bottom: 16px;">Formulário de Busca</h3>

        <mnt-filter-search
          id="formSearchField"
          name="searchTerm"
          placeholder="Digite o termo de busca..."
          size="medium"
          full-width
          required
        ></mnt-filter-search>

        <button
          type="submit"
          style="margin-top: 16px; padding: 12px 24px; background: #0066cc; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;"
        >
          Buscar
        </button>
      </form>

      <div id="formOutput" style="margin-top: 20px; padding: 16px; background: #f0f0f0; border-radius: 6px;">
        Preencha o campo e clique em Buscar
      </div>
    </div>
  `;
};
InForm.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de uso do campo de busca dentro de um formulário HTML com validação.',
    },
  },
};

/**
 * Exemplo Angular - Filtrar Lista de Cupons
 */
export const AngularBasicUsage: StoryFn = () => {
  setTimeout(() => {
    const searchField = document.getElementById('angularSearchField') as HTMLElement;
    const resultsList = document.getElementById('angularResultsList') as HTMLElement;
    const statusDiv = document.getElementById('angularStatus') as HTMLElement;
    const clearBtn = document.getElementById('angularClearBtn') as HTMLButtonElement;

    const vouchers = [
      { id: 1, name: 'DESCONTO10', discount: 10 },
      { id: 2, name: 'DESCONTO20', discount: 20 },
      { id: 3, name: 'FRETEGRATIS', discount: 0 },
      { id: 4, name: 'PRIMCOMPRA', discount: 15 },
      { id: 5, name: 'BLACKFRIDAY', discount: 50 },
      { id: 6, name: 'NATAL2024', discount: 25 },
    ];

    let filteredVouchers = [...vouchers];
    let hasFilter = false;

    function renderVouchers() {
      resultsList.innerHTML = filteredVouchers
        .map(
          (v) => `
        <li style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <strong>${v.name}</strong>
          <span style="color: #0066cc;">${v.discount}% de desconto</span>
        </li>
      `,
        )
        .join('');

      statusDiv.innerHTML = hasFilter
        ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>${filteredVouchers.length} cupons encontrados</span>
        </div>
      `
        : '';

      clearBtn.style.display = hasFilter ? 'inline-block' : 'none';
    }

    searchField?.addEventListener('filterApplied', (e: CustomEvent) => {
      const value = e.detail.value.toUpperCase();

      if (value) {
        filteredVouchers = vouchers.filter((voucher) => voucher.name.includes(value));
        hasFilter = true;
      } else {
        filteredVouchers = [...vouchers];
        hasFilter = false;
      }

      renderVouchers();
    });

    clearBtn?.addEventListener('click', () => {
      const field = searchField as any;
      if (field) {
        field.value = '';
      }
      filteredVouchers = [...vouchers];
      hasFilter = false;
      renderVouchers();
    });

    renderVouchers();
  }, 100);

  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Filtrar Lista de Cupons</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <div style="margin-bottom: 16px;">
          <mnt-filter-search
            id="angularSearchField"
            size="medium"
            full-width
            placeholder="Buscar por cupom..."
            name="voucher-search-input"
          ></mnt-filter-search>
        </div>

        <div id="angularStatus" style="margin-bottom: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px;"></div>

        <button
          id="angularClearBtn"
          style="display: none; margin-bottom: 12px; padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
        >
          Limpar filtro
        </button>

        <ul id="angularResultsList" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
        </ul>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component } from '@angular/core';

interface Voucher {
  id: number;
  name: string;
  discount: number;
}

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html'
})
export class VoucherListComponent {
  availableVoucherList: Voucher[] = [
    { id: 1, name: 'DESCONTO10', discount: 10 },
    { id: 2, name: 'DESCONTO20', discount: 20 },
    { id: 3, name: 'FRETEGRATIS', discount: 0 },
    { id: 4, name: 'PRIMCOMPRA', discount: 15 },
    { id: 5, name: 'BLACKFRIDAY', discount: 50 },
    { id: 6, name: 'NATAL2024', discount: 25 }
  ];

  availableVoucherListFiltered: Voucher[] = [...this.availableVoucherList];
  hasFilterApplied: boolean = false;

  handleSearch(event: any): void {
    const value = event.detail.value.toUpperCase();

    if (value) {
      this.availableVoucherListFiltered = this.availableVoucherList
        .filter(voucher => voucher.name.includes(value));
      this.hasFilterApplied = true;
    } else {
      this.availableVoucherListFiltered = [...this.availableVoucherList];
      this.hasFilterApplied = false;
    }
  }

  clearFilter(): void {
    const searchInput = document.querySelector('mnt-filter-search') as any;
    if (searchInput) {
      searchInput.value = '';
    }
    this.availableVoucherListFiltered = [...this.availableVoucherList];
    this.hasFilterApplied = false;
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;div class="search-container"&gt;
  &lt;mnt-filter-search
    size="medium"
    full-width
    class="w-100"
    placeholder="Buscar por cupom..."
    (filterApplied)="handleSearch($event)"
    name="voucher-search-input"
  &gt;&lt;/mnt-filter-search&gt;

  &lt;div *ngIf="hasFilterApplied" class="filter-status"&gt;
    {{ availableVoucherListFiltered.length }} cupons encontrados
    &lt;button (click)="clearFilter()"&gt;Limpar filtro&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;ul class="voucher-list"&gt;
  &lt;li *ngFor="let voucher of availableVoucherListFiltered"&gt;
    &lt;strong&gt;{{ voucher.name }}&lt;/strong&gt;
    &lt;span&gt;{{ voucher.discount }}% de desconto&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
      </details>

      <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 12px; border-radius: 6px;">
        <strong>💡 Dica:</strong> Use o evento <code>filterApplied</code> para operações de filtro, pois ele só dispara quando o usuário sai do campo (blur) ou limpa o campo, evitando requisições desnecessárias.
      </div>
    </div>
  `;
};
AngularBasicUsage.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo completo de uso em Angular para filtrar uma lista de cupons. Simula o comportamento real de uma aplicação.',
    },
  },
};

/**
 * Exemplo Angular - Busca Reativa com Debounce
 */
export const AngularReactiveSearch: StoryFn = () => {
  setTimeout(() => {
    const searchField = document.getElementById('reactiveSearchField') as HTMLElement;
    const resultsList = document.getElementById('reactiveResultsList') as HTMLElement;
    const statusDiv = document.getElementById('reactiveStatus') as HTMLElement;

    const products = [
      { id: 1, name: 'Notebook Dell', category: 'Eletrônicos' },
      { id: 2, name: 'Mouse Logitech', category: 'Periféricos' },
      { id: 3, name: 'Teclado Mecânico', category: 'Periféricos' },
      { id: 4, name: 'Monitor Samsung', category: 'Eletrônicos' },
      { id: 5, name: 'Webcam HD', category: 'Periféricos' },
      { id: 6, name: 'Headset Gamer', category: 'Periféricos' },
    ];

    let debounceTimer: any;
    let searchCount = 0;

    function renderProducts(filtered: any[]) {
      resultsList.innerHTML = filtered
        .map(
          (p) => `
        <li style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          <strong>${p.name}</strong>
          <div style="font-size: 12px; color: #666;">${p.category}</div>
        </li>
      `,
        )
        .join('');
    }

    searchField?.addEventListener('valueChange', (e: CustomEvent) => {
      const value = e.detail.value.toLowerCase();

      clearTimeout(debounceTimer);

      statusDiv.innerHTML = '<div style="color: #ff9800;">⏳ Aguardando digitação...</div>';

      debounceTimer = setTimeout(() => {
        searchCount++;

        if (value) {
          const filtered = products.filter((p) => p.name.toLowerCase().includes(value) || p.category.toLowerCase().includes(value));
          renderProducts(filtered);
          statusDiv.innerHTML = `<div style="color: #4caf50;">✓ Busca #${searchCount}: ${filtered.length} produtos encontrados</div>`;
        } else {
          renderProducts(products);
          statusDiv.innerHTML = '';
        }
      }, 300);
    });

    renderProducts(products);
  }, 100);

  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Busca Reativa com Debounce</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <mnt-filter-search
          id="reactiveSearchField"
          size="medium"
          full-width
          placeholder="Buscar produtos em tempo real..."
          name="reactive-search"
        ></mnt-filter-search>

        <div id="reactiveStatus" style="margin: 12px 0; min-height: 24px; font-size: 14px;"></div>

        <ul id="reactiveResultsList" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
        </ul>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  category: string;
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html'
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject&lt;string&gt;();
  private destroy$ = new Subject&lt;void&gt;();

  products: Product[] = [
    { id: 1, name: 'Notebook Dell', category: 'Eletrônicos' },
    { id: 2, name: 'Mouse Logitech', category: 'Periféricos' },
    // ... mais produtos
  ];

  filteredProducts: Product[] = [...this.products];
  isSearching = false;

  ngOnInit(): void {
    // Aplica filtro com debounce de 300ms
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.applyFilter(searchTerm);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleValueChange(event: any): void {
    this.isSearching = true;
    this.searchSubject.next(event.detail.value);
  }

  handleFilterApplied(event: any): void {
    console.log('Busca confirmada:', event.detail.value);
  }

  private applyFilter(searchTerm: string): void {
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
    this.isSearching = false;
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;mnt-filter-search
  placeholder="Buscar produtos em tempo real..."
  size="medium"
  full-width
  (valueChange)="handleValueChange($event)"
  (filterApplied)="handleFilterApplied($event)"
&gt;&lt;/mnt-filter-search&gt;

&lt;div *ngIf="isSearching" class="searching-indicator"&gt;
  Buscando...
&lt;/div&gt;

&lt;ul&gt;
  &lt;li *ngFor="let product of filteredProducts"&gt;
    &lt;strong&gt;{{ product.name }}&lt;/strong&gt;
    &lt;div&gt;{{ product.category }}&lt;/div&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
      </details>

      <div style="background: #e8f5e9; border: 1px solid #4caf50; padding: 12px; border-radius: 6px;">
        <strong>✅ Boas Práticas:</strong><br>
        • Use <code>debounceTime(300)</code> para evitar buscas excessivas<br>
        • Use <code>distinctUntilChanged()</code> para evitar buscas duplicadas<br>
        • Implemente <code>takeUntil()</code> para limpar subscriptions no ngOnDestroy
      </div>
    </div>
  `;
};
AngularReactiveSearch.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo de busca em tempo real usando RxJS com debounce para otimizar performance.',
    },
  },
};

/**
 * Exemplo Angular - Filtros Avançados
 */
export const AngularAdvancedFiltering: StoryFn = () => {
  setTimeout(() => {
    const searchField = document.getElementById('advancedSearchField') as HTMLElement;
    const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
    const clearAllBtn = document.getElementById('clearAllFiltersBtn') as HTMLButtonElement;
    const resultsList = document.getElementById('advancedResultsList') as HTMLElement;
    const statusDiv = document.getElementById('advancedStatus') as HTMLElement;

    const products = [
      { id: 1, name: 'Notebook Dell Inspiron', category: 'eletronicos', price: 3500 },
      { id: 2, name: 'Mouse Logitech MX', category: 'perifericos', price: 250 },
      { id: 3, name: 'Teclado Mecânico RGB', category: 'perifericos', price: 450 },
      { id: 4, name: 'Monitor Samsung 27"', category: 'eletronicos', price: 1200 },
      { id: 5, name: 'Webcam Logitech HD', category: 'perifericos', price: 350 },
      { id: 6, name: 'Tablet Apple iPad', category: 'eletronicos', price: 4000 },
      { id: 7, name: 'Fone Sony WH-1000XM4', category: 'audio', price: 1500 },
      { id: 8, name: 'Caixa de Som JBL', category: 'audio', price: 800 },
    ];

    let currentSearchTerm = '';
    let currentCategory = 'all';

    function applyFilters() {
      let filtered = [...products];

      if (currentSearchTerm) {
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(currentSearchTerm.toLowerCase()));
      }

      if (currentCategory !== 'all') {
        filtered = filtered.filter((p) => p.category === currentCategory);
      }

      renderProducts(filtered);

      const hasFilters = currentSearchTerm || currentCategory !== 'all';
      clearAllBtn.style.display = hasFilters ? 'inline-block' : 'none';

      if (hasFilters) {
        statusDiv.innerHTML = `
          <div style="padding: 12px; background: #e3f2fd; border-radius: 6px; border-left: 4px solid #2196f3;">
            <strong>Filtros ativos:</strong><br>
            ${currentSearchTerm ? `Busca: "${currentSearchTerm}"<br>` : ''}
            ${currentCategory !== 'all' ? `Categoria: ${categorySelect.options[categorySelect.selectedIndex].text}` : ''}
          </div>
        `;
      } else {
        statusDiv.innerHTML = '';
      }
    }

    function renderProducts(filtered: any[]) {
      if (filtered.length === 0) {
        resultsList.innerHTML = '<li style="padding: 20px; text-align: center; color: #666;">Nenhum produto encontrado</li>';
        return;
      }

      resultsList.innerHTML = filtered
        .map(
          (p) => `
        <li style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${p.name}</strong>
            <div style="font-size: 12px; color: #666; text-transform: capitalize;">${p.category}</div>
          </div>
          <div style="font-size: 16px; font-weight: bold; color: #0066cc;">
            R$ ${p.price.toFixed(2)}
          </div>
        </li>
      `,
        )
        .join('');

      const totalValue = filtered.reduce((sum, p) => sum + p.price, 0);
      resultsList.innerHTML += `
        <li style="padding: 12px; background: #f5f5f5; border-radius: 6px; font-weight: bold; display: flex; justify-content: space-between;">
          <span>Total (${filtered.length} produtos)</span>
          <span style="color: #0066cc;">R$ ${totalValue.toFixed(2)}</span>
        </li>
      `;
    }

    searchField?.addEventListener('filterApplied', (e: CustomEvent) => {
      currentSearchTerm = e.detail.value;
      applyFilters();
    });

    categorySelect?.addEventListener('change', () => {
      currentCategory = categorySelect.value;
      applyFilters();
    });

    clearAllBtn?.addEventListener('click', () => {
      const field = searchField as any;
      if (field) {
        field.value = '';
      }
      categorySelect.value = 'all';
      currentSearchTerm = '';
      currentCategory = 'all';
      applyFilters();
    });

    applyFilters();
  }, 100);

  return `
    <div style="padding: 20px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin-top: 0;">Exemplo Angular - Filtros Avançados</h3>

      <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 16px;">
          <mnt-filter-search
            id="advancedSearchField"
            size="medium"
            placeholder="Buscar por nome do produto..."
            name="advanced-search"
            full-width
          ></mnt-filter-search>

          <select id="categorySelect">
            <option value="all">Todas as categorias</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="perifericos">Periféricos</option>
            <option value="audio">Áudio</option>
          </select>
        </div>

        <button
          id="clearAllFiltersBtn"
          style="display: none; margin-bottom: 12px; padding: 8px 16px; background: black; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
        >
          Limpar todos os filtros
        </button>

        <div id="advancedStatus" style="margin-bottom: 12px;"></div>

        <ul id="advancedResultsList" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
        </ul>
      </div>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.ts</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html'
})
export class AdvancedFilterComponent {
  products: Product[] = [
    { id: 1, name: 'Notebook Dell', category: 'eletronicos', price: 3500 },
    { id: 2, name: 'Mouse Logitech', category: 'perifericos', price: 250 },
    // ... mais produtos
  ];

  filteredProducts: Product[] = [...this.products];

  searchTerm: string = '';
  selectedCategory: string = 'all';
  hasFiltersApplied: boolean = false;

  handleSearch(event: any): void {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  handleCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Filtro por texto
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    this.filteredProducts = filtered;
    this.hasFiltersApplied = this.searchTerm !== '' ||
                             this.selectedCategory !== 'all';
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';

    // Limpa o campo visualmente
    const searchInput = document.querySelector('mnt-filter-search') as any;
    if (searchInput) {
      searchInput.value = '';
    }

    this.applyFilters();
  }

  getTotalValue(): number {
    return this.filteredProducts.reduce((sum, p) => sum + p.price, 0);
  }
}</code></pre>
      </details>

      <details style="background: #2d2d2d; color: #fff; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
        <summary style="cursor: pointer; font-weight: 500; margin-bottom: 12px;">📄 component.html</summary>
        <pre style="margin: 0; overflow-x: auto;"><code style="color: #a9b7c6;">&lt;div class="filters"&gt;
  &lt;div class="filter-row"&gt;
    &lt;mnt-filter-search
      size="medium"
      placeholder="Buscar por nome do produto..."
      (filterApplied)="handleSearch($event)"
      name="product-search"
    &gt;&lt;/mnt-filter-search&gt;

    &lt;select
      [(ngModel)]="selectedCategory"
      (change)="handleCategoryChange(selectedCategory)"
    &gt;
      &lt;option value="all"&gt;Todas as categorias&lt;/option&gt;
      &lt;option value="eletronicos"&gt;Eletrônicos&lt;/option&gt;
      &lt;option value="perifericos"&gt;Periféricos&lt;/option&gt;
      &lt;option value="audio"&gt;Áudio&lt;/option&gt;
    &lt;/select&gt;
  &lt;/div&gt;

  &lt;button
    *ngIf="hasFiltersApplied"
    (click)="clearAllFilters()"
    class="clear-btn"
  &gt;
    Limpar todos os filtros
  &lt;/button&gt;

  &lt;div *ngIf="hasFiltersApplied" class="filter-status"&gt;
    Filtros ativos: {{ searchTerm }} {{ selectedCategory }}
  &lt;/div&gt;
&lt;/div&gt;

&lt;ul class="product-list"&gt;
  &lt;li *ngFor="let product of filteredProducts"&gt;
    &lt;strong&gt;{{ product.name }}&lt;/strong&gt;
    &lt;span&gt;{{ product.price | currency: 'BRL' }}&lt;/span&gt;
  &lt;/li&gt;
&lt;/ul&gt;

&lt;div class="total"&gt;
  Total: {{ getTotalValue() | currency: 'BRL' }}
&lt;/div&gt;</code></pre>
      </details>

      <div style="background: #e8f5e9; border: 1px solid #4caf50; padding: 12px; border-radius: 6px;">
        <strong>🎯 Padrão Recomendado:</strong><br>
        • Combine múltiplos filtros de forma independente<br>
        • Mostre quais filtros estão ativos<br>
        • Forneça botão para limpar todos os filtros de uma vez<br>
        • Exiba contagem e resumo dos resultados filtrados
      </div>
    </div>
  `;
};
AngularAdvancedFiltering.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplo avançado combinando busca por texto com filtros por categoria, incluindo indicadores visuais e botão para limpar todos os filtros.',
    },
  },
};
