# Login Micro Frontend

Este é o micro frontend responsável pelo módulo de autenticação do sistema.

## Requisitos

- Node.js 20.x
- npm 10.x
- Docker (opcional)

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

## Executando com Docker

```bash
# Construir a imagem
docker build -t mfe-login .

# Executar o container
docker run -d -p 4200:4200 mfe-login
```

O aplicativo estará disponível em `http://localhost:4200`

## Funcionalidades

- Login com email e senha
- Registro de novos usuários
- Recuperação de senha
- Redefinição de senha

## Estrutura do Projeto

O projeto segue a estrutura padrão Angular com os seguintes componentes principais:

- `src/app/components/login`: Componente de login
- `src/app/components/register`: Componente de registro
- `src/app/components/forgot-password`: Componente de recuperação de senha
- `src/app/components/reset-password`: Componente de redefinição de senha

## Configuração CORS

O projeto está configurado para aceitar requisições de qualquer origem em ambiente de desenvolvimento. Para produção, você deve ajustar as configurações CORS no arquivo `nginx.conf` conforme necessário.

## Integração

Este micro frontend pode ser integrado ao projeto principal através de Module Federation. As configurações necessárias já estão presentes no projeto.

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera o build de produção
- `npm test`: Executa os testes
- `npm run lint`: Executa o linter
