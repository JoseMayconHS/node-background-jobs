
# Background jobs com Node e Docker

Aplicação base com Docker, Redis, Background Jobs, Jest e SOLID



## Funcionalidades

- Envio de email em background


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MAIL_HOST`
`MAIL_PORT`
`MAIL_USER`
`MAIL_PASS`

`REDIS_HOST`
`REDIS_PORT`
`REDIS_USER`
`REDIS_PASS`

`PORT`



## Documentação da API

#### Retorna todos os itens

```http
  POST /user
```

| Parâmetros   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**.
| `email` | `string` | **Obrigatório**.

#### Retorna:
```
{ ok: true }
```



## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```
