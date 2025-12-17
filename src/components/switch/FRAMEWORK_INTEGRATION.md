# Framework Integration Guide - Switch Component

## 🎯 Melhorias Implementadas

O componente Switch foi otimizado para integração facilitada com frameworks. As seguintes melhorias foram implementadas:

### 1. **Propriedade `checked` com `reflect: true`**
```typescript
@Prop({ mutable: true, reflect: true }) checked?: boolean = false;
```
- Sincronização automática entre prop e atributo HTML
- Permite two-way binding nativo em frameworks

### 2. **Eventos Padrão de React/Angular**
```typescript
@Event({ eventName: 'onChange' }) onChange: EventEmitter<SwitchChangeEventDetail>;
@Event({ eventName: 'onBlur' }) onBlur: EventEmitter<FocusEvent>;
@Event({ eventName: 'onFocus' }) onFocus: EventEmitter<FocusEvent>;
```
- Nomes de eventos familiares: `onChange`, `onBlur`, `onFocus`
- Compatível com convenções de React, Angular e outros frameworks
- Também emite eventos nativos `change` e `input` para máxima compatibilidade

### 3. **Getters/Setters para `checkedValue`**
```typescript
element.checkedValue = true;  // Set
const val = element.checkedValue;  // Get
```
- Acesso direto via propriedade `checkedValue`
- Não precisa de métodos assíncronos
- Nota: `value` é reservado para o valor do formulário

### 4. **Watch aprimorado**
- Sincronização bidirecional automática
- Atualiza input nativo quando prop muda externamente

---

## 📱 Uso Simplificado por Framework

### **Angular (v12+)**

#### ✨ Uso Direto - SUPER SIMPLES (Recomendado)

**Template:**
```html
<mnt-switch
  (onChange)="handleSwitchChange($event)"
  label="Notificações"
  id="isFreeDelivery"
></mnt-switch>
```

**Componente:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html'
})
export class MyComponent {
  handleSwitchChange(event: any): void {
    console.log('Checked:', event.detail.checked);
    console.log('Value:', event.detail.value);
    console.log('ID:', event.detail.id);
    
    // Usar o valor
    const isEnabled = event.detail.checked;
    if (isEnabled) {
      // Fazer algo quando ativado
    }
  }
}
```

**Exemplo com Controle de Estado:**
```typescript
@Component({
  template: `
    <mnt-switch
      [checked]="isEnabled"
      (onChange)="handleChange($event)"
      label="Ativar notificações"
    ></mnt-switch>
    
    <p>Estado: {{ isEnabled ? 'Ativado' : 'Desativado' }}</p>
    <button (click)="toggle()">Toggle</button>
  `
})
export class MyComponent {
  isEnabled = false;

  handleChange(event: any): void {
    this.isEnabled = event.detail.checked;
  }

  toggle(): void {
    this.isEnabled = !this.isEnabled;
  }
}
```

**Exemplo com Formulário Reativo:**
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="myForm">
      <mnt-switch
        [checked]="myForm.get('notifications')?.value"
        (onChange)="updateFormValue('notifications', $event)"
        label="Notificações"
      ></mnt-switch>
      
      <mnt-switch
        [checked]="myForm.get('darkMode')?.value"
        (onChange)="updateFormValue('darkMode', $event)"
        label="Modo Escuro"
      ></mnt-switch>
      
      <button (click)="onSubmit()">Salvar</button>
    </form>
    
    <pre>{{ myForm.value | json }}</pre>
  `
})
export class MyComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      notifications: [false],
      darkMode: [false]
    });
  }

  updateFormValue(controlName: string, event: any): void {
    this.myForm.patchValue({
      [controlName]: event.detail.checked
    });
  }

  onSubmit(): void {
    console.log('Form values:', this.myForm.value);
  }
}
```

#### 📦 Módulo Setup (One-time)

```typescript
// app.module.ts ou shared.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { defineCustomElements } from '@yooga-tecnologia/mantra/loader';

// Definir custom elements
defineCustomElements(window);

@NgModule({
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Necessário para Web Components
})
export class AppModule { }

---

### **React**

#### Uso Direto (Simples)
```tsx
import { useRef, useEffect, useState } from 'react';

function MyComponent() {
  const switchRef = useRef<any>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const element = switchRef.current;
    if (!element) return;

    // Ouve o evento onChange
    const handleChange = (e: any) => {
      setEnabled(e.detail.checked);
      console.log('Changed to:', e.detail.checked);
    };

    element.addEventListener('onChange', handleChange);
    return () => element.removeEventListener('onChange', handleChange);
  }, []);

  return (
    <>
      <mnt-switch
        ref={switchRef}
        checked={enabled}
        label="Notificações"
      />
      
      <p>Status: {enabled ? 'Ativado' : 'Desativado'}</p>
      
      <button onClick={() => {
        if (switchRef.current) {
          switchRef.current.checkedValue = !enabled;
        }
      }}>
        Toggle
      </button>
    </>
  );
}
```

#### Hook Customizado (Recomendado)
```tsx
// hooks/useMntSwitch.ts
import { useRef, useEffect, useState } from 'react';

export function useMntSwitch(initialValue = false) {
  const ref = useRef<any>(null);
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handler = (e: any) => setChecked(e.detail.checked);
    element.addEventListener('onChange', handler);
    return () => element.removeEventListener('onChange', handler);
  }, []);

  const toggle = () => {
    if (ref.current) {
      ref.current.checkedValue = !checked;
    }
  };

  const setValue = (value: boolean) => {
    if (ref.current) {
      ref.current.checkedValue = value;
    }
  };

  return { ref, checked, toggle, setValue };
}

// Uso
function MyComponent() {
  const notifications = useMntSwitch(false);
  const darkMode = useMntSwitch(true);

  return (
    <>
      <mnt-switch ref={notifications.ref} label="Notificações" />
      <mnt-switch ref={darkMode.ref} label="Modo Escuro" />
      
      <button onClick={notifications.toggle}>Toggle Notificações</button>
      <button onClick={() => darkMode.setValue(false)}>Desativar Dark Mode</button>
      
      <p>Notificações: {notifications.checked ? 'ON' : 'OFF'}</p>
      <p>Dark Mode: {darkMode.checked ? 'ON' : 'OFF'}</p>
    </>
  );
}
```

---

### **Vue 3**

#### Composition API
```vue
<template>
  <div>
    <mnt-switch
      ref="switchRef"
      :checked="enabled"
      @onChange="handleChange"
      label="Notificações"
    />
    
    <p>Status: {{ enabled ? 'Ativado' : 'Desativado' }}</p>
    <button @click="toggle">Toggle</button>
    <button @click="enable">Ativar</button>
    <button @click="disable">Desativar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchRef = ref<any>(null);
const enabled = ref(false);

const handleChange = (event: any) => {
  enabled.value = event.detail.checked;
  console.log('Changed to:', event.detail.checked);
};

const toggle = () => {
  if (switchRef.value) {
    switchRef.value.checkedValue = !enabled.value;
  }
};

const enable = () => {
  if (switchRef.value) {
    switchRef.value.checkedValue = true;
  }
};

const disable = () => {
  if (switchRef.value) {
    switchRef.value.checkedValue = false;
  }
};
</script>
```

#### Options API
```vue
<template>
  <div>
    <mnt-switch
      ref="switchRef"
      :checked="enabled"
      @onChange="handleChange"
      label="Notificações"
    />
    
    <button @click="toggle">Toggle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enabled: false
    };
  },
  methods: {
    handleChange(event) {
      this.enabled = event.detail.checked;
    },
    toggle() {
      this.$refs.switchRef.checkedValue = !this.enabled;
    }
  }
};
</script>
```

---

### **Vanilla JavaScript**

```javascript
const switchElement = document.querySelector('mnt-switch');

// Ouvir mudanças com evento onChange
switchElement.addEventListener('onChange', (event) => {
  console.log('Checked:', event.detail.checked);
  console.log('Value:', event.detail.value);
  console.log('ID:', event.detail.id);
  console.log('Name:', event.detail.name);
});

// Set/Get simplificado
switchElement.checkedValue = true;  // Set
console.log(switchElement.checkedValue);  // Get (true)

// Toggle
switchElement.checkedValue = !switchElement.checkedValue;

// Também pode ouvir eventos nativos (change, input)
switchElement.addEventListener('change', (event) => {
  console.log('Native change event:', event.detail);
});
```

**Exemplo Completo:**
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@yooga-tecnologia/mantra/dist/mantra/mantra.esm.js"></script>
</head>
<body>
  <h2>Switch Demo</h2>
  
  <mnt-switch 
    id="notification-switch" 
    label="Notificações" 
    description="Receber atualizações"
  ></mnt-switch>
  
  <p>Status: <span id="status">Desativado</span></p>
  
  <button id="toggle-btn">Toggle</button>
  <button id="enable-btn">Ativar</button>
  <button id="disable-btn">Desativar</button>
  
  <script>
    const sw = document.getElementById('notification-switch');
    const status = document.getElementById('status');
    
    // Listener
    sw.addEventListener('onChange', (e) => {
      status.textContent = e.detail.checked ? 'Ativado' : 'Desativado';
      console.log('Changed:', e.detail);
    });
    
    // Controles
    document.getElementById('toggle-btn').addEventListener('click', () => {
      sw.checkedValue = !sw.checkedValue;
    });
    
    document.getElementById('enable-btn').addEventListener('click', () => {
      sw.checkedValue = true;
    });
    
    document.getElementById('disable-btn').addEventListener('click', () => {
      sw.checkedValue = false;
    });
  </script>
</body>
</html>
```

---

## 🔄 Comparação: Antes vs Depois

### ❌ **ANTES (Complexo)**

```typescript
// Angular - ANTES
@Component({
  template: `
    <mnt-switch #sw></mnt-switch>
  `
})
class MyComponent implements AfterViewInit {
  @ViewChild('sw') switchRef!: ElementRef;
  
  ngAfterViewInit() {
    // Evento customizado específico
    this.switchRef.nativeElement.addEventListener('mntChange', (e: any) => {
      console.log(e.detail.checked);
    });
  }
  
  async toggleSwitch() {
    // Async/await obrigatório
    const currentValue = await this.switchRef.nativeElement.getChecked();
    await this.switchRef.nativeElement.setChecked(!currentValue);
  }
}
```

### ✅ **DEPOIS (Super Simples!)**

```typescript
// Angular - DEPOIS
@Component({
  template: `
    <mnt-switch 
      (onChange)="handleChange($event)"
      [checked]="enabled"
    ></mnt-switch>
    
    <button (click)="toggle()">Toggle</button>
  `
})
class MyComponent {
  enabled = false;
  
  handleChange(event: any) {
    // Evento padrão onChange (igual React!)
    this.enabled = event.detail.checked;
  }
  
  toggle() {
    // Simples! Sem async/await
    this.enabled = !this.enabled;
  }
}
```

---

## 📊 Benefícios das Melhorias

| Recurso | Antes | Depois |
|---------|-------|--------|
| **Set Value** | `await setChecked(true)` | `element.checkedValue = true` |
| **Get Value** | `await getChecked()` | `element.checkedValue` |
| **Eventos** | `mntChange`, `mntBlur`, `mntFocus` | `onChange`, `onBlur`, `onFocus` + nativos |
| **Nome dos Eventos** | Customizado (mnt prefix) | Padrão (on prefix) |
| **Two-Way Binding** | Requer wrapper complexo | Binding direto com `[checked]` |
| **Sincronização** | Manual | Automática com `reflect: true` |
| **Async/Await** | Obrigatório | Opcional |
| **Angular** | ~100 linhas de código | ~5 linhas! |

---

## 🎨 Padrões de Uso Recomendados

### **Angular: Criar Módulo Compartilhado**

```typescript
// shared.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwitchDirective } from './directives/switch.directive';

@NgModule({
  declarations: [SwitchDirective],
  exports: [SwitchDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MantraModule {}
```

**Uso em toda aplicação:**
```typescript
// app.module.ts
import { MantraModule } from './shared/mantra.module';

@NgModule({
  imports: [MantraModule],
  // ...
})
export class AppModule {}
```

```html
<!-- Qualquer componente -->
<mnt-switch [(ngModel)]="value" label="Label"></mnt-switch>
```

---

### **React: Hook Customizado**

```typescript
// hooks/useMntSwitch.ts
import { useRef, useEffect, useState } from 'react';

export function useMntSwitch(initialValue = false) {
  const ref = useRef<any>(null);
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handler = (e: any) => setChecked(e.detail.checked);
    element.addEventListener('onChange', handler);
    return () => element.removeEventListener('onChange', handler);
  }, []);

  const toggle = () => {
    if (ref.current) {
      ref.current.checkedValue = !checked;
    }
  };

  const setValue = (value: boolean) => {
    if (ref.current) {
      ref.current.checkedValue = value;
    }
  };

  return { ref, checked, toggle, setValue };
}

// Uso
function MyComponent() {
  const notifications = useMntSwitch(false);

  return (
    <>
      <mnt-switch ref={notifications.ref} label="Notificações" />
      <p>Status: {notifications.checked ? 'ON' : 'OFF'}</p>
      <button onClick={notifications.toggle}>Toggle</button>
      <button onClick={() => notifications.setValue(true)}>Ativar</button>
    </>
  );
}
```

---

## 🚀 Migração de Código Existente

Se você já tem código usando os métodos antigos, eles **continuam funcionando**! As melhorias são **backward compatible**.

```typescript
// ✅ Código antigo continua funcionando
await element.setChecked(true);
const value = await element.getChecked();

// ✅ Novo código mais simples
element.checkedValue = true;
const value = element.checkedValue;
```

---

## 📝 Checklist de Integração

- [ ] Adicionar `CUSTOM_ELEMENTS_SCHEMA` no módulo
- [ ] Importar e registrar `defineCustomElements`
- [ ] Criar diretiva/hook customizado (opcional, mas recomendado)
- [ ] Usar eventos `change`/`input` ao invés de apenas `mntChange`
- [ ] Usar `element.checkedValue` ao invés de `getChecked()/setChecked()`
- [ ] Aproveitar `reflect: true` para binding automático

---

## 🎯 Conclusão

Com essas melhorias, o componente Switch agora:

✅ **Eventos familiares**: `onChange`, `onBlur`, `onFocus` (igual React/Angular)  
✅ **Binding direto**: Use `[checked]` e `(onChange)` - sem wrappers!  
✅ **Zero configuração**: Funciona imediatamente em qualquer framework  
✅ **Síncrono**: Não precisa de async/await para operações básicas  
✅ **Compatível**: Emite eventos nativos também (`change`, `input`)  
✅ **Simples**: De ~100 linhas de wrapper para **5 linhas de código**!  

**Resultado Final:**

| Framework | Antes | Depois |
|-----------|-------|--------|
| Angular | ~100 linhas wrapper + diretiva | **5 linhas** (apenas template!) |
| React | ~80 linhas HOC | **15 linhas** hook opcional |
| Vue | ~50 linhas composable | **10 linhas** template |
| Vanilla | ~40 linhas helper | **Uso direto!** |

**O componente agora é tão simples de usar quanto um `<input type="checkbox">` nativo!** 🎉

