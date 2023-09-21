# API Node.js com Fastify e Postgres

Este projeto tem como objetivo explorar o desenvolvimento de APIs utilizando Node.js, fazendo uso do micro-framework Fastify e armazenando informações em um banco de dados Postgres. A API implementada aqui é um CRUD para o armazenamento de informações relacionadas a vídeos em um banco de dados.

## Executando o Projeto

A execução deste projeto é simples e pode ser feita seguindo as etapas abaixo:

1. **Instalação das Dependências**
   Antes de executar a aplicação, é necessário instalar as dependências. Você pode fazê-lo utilizando o seguinte comando:
    
    ```
    npm install
    ```

2. **Iniciando a Aplicação**
   Após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:
   ```
   node server.js
   ```
   > Isso iniciará a API e estará pronta para receber solicitações.

3. **Modo de Desenvolvimento com Atualização Automática**
   Se você deseja desenvolver e atualizar o código sem a necessidade de parar e reiniciar a aplicação a cada modificação, pode usar o seguinte comando:
   ```
   node --watch --no-warnings server.js
   ```
   > Isso permitirá que a aplicação seja atualizada automaticamente sempre que houver alterações no código-fonte.
