# 💰 ContaAqui — Web (contaaqui-ui)

> Plataforma de controle financeiro pessoal: registre entradas e saídas, organize por categorias e acompanhe o saldo da sua carteira.

Este repositório contém o **front-end web** do ContaAqui.

| Repositório | Papel |
|---|---|
| [contaaqui-service](https://github.com/thiagoocms/contaaqui-service) | API REST: regras de negócio, autenticação e segurança |
| [contaaqui-core](https://github.com/thiagoocms/contaaqui-core) | Biblioteca compartilhada: entidades, DTOs, repositórios e filtros dinâmicos |
| **[contaaqui-ui](https://github.com/thiagoocms/contaaqui-ui)** (este) | Front-end web em Angular |

---

## 🎯 Visão de negócio

**Problema:** muita gente não sabe para onde vai o próprio dinheiro. Planilhas dão trabalho e os apps de banco mostram só uma conta.

**Solução:** uma interface simples para o usuário:

- **Criar a conta** num cadastro guiado por etapas, com validação de documento (CPF, RG ou CNH).
- **Entrar com segurança:** login com usuário e senha e depois um **código de verificação enviado por e-mail** (2FA).
- **Registrar entradas e saídas** e organizá-las por **categorias**.
- **Visualizar a saúde financeira** num **dashboard** com gráficos: entradas × saídas por mês, saldo acumulado e gastos por categoria.

---

## 🛠️ Visão técnica

### Stack
- **Angular 21** + **TypeScript 5.9**
- **RxJS** para comunicação assíncrona
- **Bootstrap 5** para layout responsivo
- **Chart.js** + **ng2-charts** para os gráficos
- **Docker** + **Nginx** para servir a build de produção

### Funcionalidades / telas
| Tela | Descrição |
|---|---|
| **Cadastro** | Formulário em etapas com indicador de progresso e validação/máscara de documento |
| **Login** | Autenticação com credenciais |
| **MFA** | Confirmação do código enviado por e-mail |
| **Home** | Visão geral com cards |
| **Dashboard** | Gráficos de barras, linha, pizza e rosca |
| **Categorias** | Listagem e gestão de categorias |

### Arquitetura
```
src/app/
├── layout/          # header, sidebar, wrapper, modais e componentes reutilizáveis
│   └── components/  # button, input, table, toggle
├── pages/           # auth (login, mfa, register), home, dashboard, categories
└── shared/
    ├── network/     # services e models por recurso (auth, user, wallet, transaction, category)
    ├── interceptors/# tratamento global de erros e loading automático
    ├── pipes/       # máscara de documento
    └── validators/  # validação de documento
```

Destaques:
- **Lazy loading** dos módulos de páginas.
- **Auth Guard** que protege as rotas autenticadas.
- **Interceptors HTTP** que exibem o loading global e tratam os erros num só lugar.
- **`BaseService` genérico** para consumir os CRUDs da API.
- **Biblioteca própria de componentes** (botões, inputs, tabelas, modais de alerta e confirmação).

---

## ▶️ Como rodar

**Pré-requisitos:** Node 20+ e a [API](https://github.com/thiagoocms/contaaqui-service) rodando.

```bash
npm install
npm start          # http://localhost:4200
```

A URL da API fica em `src/environments/environment.ts` (`BASE_URL`).

**Build de produção com Docker:**
```bash
docker build -t contaaqui-ui .
docker run -p 80:80 contaaqui-ui
```

---

## 🗺️ Próximos passos
- [ ] Conectar o dashboard aos dados reais da API (hoje usa dados de exemplo)
- [ ] Tela de lançamento e listagem de transações
- [ ] Testes unitários dos componentes

---

Desenvolvido por **[Thiago](https://github.com/thiagoocms)**
