# API Node Js 

Esse projeto tem como objetivo estudar o desevolvimento de APIs utilizando NodeJs.

### O que é Node Js

Uma plataforma que nos permite executar Java Script dentro do ambitro de um BackEnd. Ou seja, podemos utilizar JavaScript dentro de aplicações que irão rodar em um servidor. Com o node podemos usar a mesma tacnologia que usamos hoje em navegadores para manipulação de DOM, para construir APIs.

### Intalação do Node 

Podemos realizar a instalação direto do site. Nada muito complicado de se realizar.

```
Para que possamos rodar a aplicação quando criada, precisamos criar noddo "package.json"
npm init -y

Para executar a aplicação, podemos usar o comando
node server.js

Para que não precisemos toda vez que modificarmos o código, parar e executar novamente a aplicação, podemos rodar um 
node --watch --no-warnings server.js
```
### Desenvolvimento Básico

* Inicialmente criaremos um arquivo chamado server.js
```
# Importando para trabalhar com servidores HTTP dentro do Node
import {} from 'node:http'

```

* Para a criação da aplicação, precisamos utilizar a função "createServer" para que seja criado um servidor para consumo.
```
import {} from 'node:http';

# Função usada para criação do servidor
const server = createServer(() => {
    console.log('Oi')
})

# Usamos a função "listen" para estipular a porta que será utilizada
server.listen(9999)
```

> Ao realizar a chamada para essa porta no nosso navegador, não temos resultados no navegador mas sim dentro do terminal no VSCode, pois colocamos como um log na aplicação.


* Para começar a fazer com que o funcionamento sejá mais parecido com o real, adicionei o request e o response na requisição
```
import {} from 'node:http';

# Adicionamos o resques e response como parametros da função
const server = createServer((request, response) => {
    # Informando que o response escrito séra o texto informado
    response.write("Hello World")
    
    # Informando que após o envio do response, será finalizado o processo 
    return response.end()
})

server.listen(9999)
```

### Desenvolvimento Framework 

* Para o desenvolvimento utilizaremos o Framework fastify
```
npm install fastify
```

* Primeiramente criaremos os primeiro parametros da API
```
# Importamos o framework que será utilizado
import { fastify } from 'fastify'

# Criamos o server que vai ser consumido
const server = fastify()

# Listamos a porta
server.listen({
    port: 9999,
})
```

* Criamos um banco local onde será inserido e consumido as informações
```
# Importamos o randomUUID e criamos a Class que será usada para armazenar
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()

}
```

* Importamos o banco local para o server
```
import { fastify } from 'fastify'
# Importamos o arquivo que será utilizado
import { DataBaseMemory } from './database-memory.js'


const server = fastify()
# Criamos uma variavel para ela
const database = new DataBaseMemory()


server.listen({
    port: 9999,
})
```

* Criamos a primeira operação da API
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'


const server = fastify()
const database = new DataBaseMemory()

# Criamos a operação para que seja garantido que a Api está funcionando
server.get('/', () => {
    return "The Api is Life"
})

server.listen({
    port: 9999,
})
```

> Está operação simplemente funciona mandando um get sem qualquer corpo para o path, onde será retornado o texto que garante a vida.

* Criamos a operação para adicionar um filme ao banco de dados 
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'

onst server = fastify()
const database = new DataBaseMemory()

server.get('/', () => {
    return "The Api is Life"
})

# Operação que recebe um body que seta na operação qual os campos que recebe
server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.listen({
    port: 9999,
})
```

* Criamos uma função na class da memoria interna para armazenar a informação dos filmes
```
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()

#
create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }


}
```

* Criamos a operação para buscar todos os filmes do banco de dados
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'

onst server = fastify()
const database = new DataBaseMemory()

server.get('/', () => {
    return "The Api is Life"
})

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

# Operação que é um get e busca todos os filmes registrados
server.get('/videos', (request) => {
    # Esse search é usado para buscar informações personalizadas nos titulos
    const search = request.query.search
    console.log(search)

    const videos = database.list(search)

    return videos
})

server.listen({
    port: 9999,
})
```

* Criamos uma função na class da memoria interna para buscar as informação dos filmes
```
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()


create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

# Essa operação pega uma Array de videos e busca todos, utilizando o search também para realizar um filtro
list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

        return {
            id, 
            ...data,
        }
        }).filter(video => {
            if (search) {
                return video.title.includes(search)
            }
        
            return true
        })
    }


}
```

* Criamos a operação para buscar filmes especificos no banco de dados
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'

onst server = fastify()
const database = new DataBaseMemory()

server.get('/', () => {
    return "The Api is Life"
})

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    # Esse search é usado para buscar informações personalizadas nos titulos
    const search = request.query.search
    console.log(search)

    const videos = database.list(search)

    return videos
})

# Está operação pega um id especifico e realiza a busca 
server.get('/videos/:id', (request, reply) => {
    const { id } = request.params
    const video = database.list2(id)

    return video
})

server.listen({
    port: 9999,
})
```

* Criamos uma função na class da memoria interna para buscar as informação de um filme especifico
```
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()


create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

        return {
            id, 
            ...data,
        }
        }).filter(video => {
            if (search) {
                return video.title.includes(search)
            }
        
            return true
        })
    }

# Está operação faz a busca através do id
list2(id){
        const video = this.#videos.get(id)
        return video
    }

}
```

* Criamos a operação para atualizar filmes na base de dados
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'

onst server = fastify()
const database = new DataBaseMemory()

server.get('/', () => {
    return "The Api is Life"
})

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    # Esse search é usado para buscar informações personalizadas nos titulos
    const search = request.query.search
    console.log(search)

    const videos = database.list(search)

    return videos
})

server.get('/videos/:id', (request, reply) => {
    const { id } = request.params
    const video = database.list2(id)

    return video
})

# Está operação utiliza como identificador de busca o Id, e possui também uma estrutura para que seja estipulado os campos que serão passados na requisição
server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    database.update( videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.listen({
    port: 9999,
})
```

* Criamos uma função na class da memoria interna para atualizar as informações de um filme 
```
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()


create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

        return {
            id, 
            ...data,
        }
        }).filter(video => {
            if (search) {
                return video.title.includes(search)
            }
        
            return true
        })
    }


list2(id){
        const video = this.#videos.get(id)
        return video
    }

# Está operação faz a busca através do id para atualizar as informações estipuladas nos parametros
update(id, video){
        this.#videos.set(id, video)
    }

}
```

* Criamos a operação para deletar filmes na base de dados
```
import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'

onst server = fastify()
const database = new DataBaseMemory()

server.get('/', () => {
    return "The Api is Life"
})

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    # Esse search é usado para buscar informações personalizadas nos titulos
    const search = request.query.search
    console.log(search)

    const videos = database.list(search)

    return videos
})

server.get('/videos/:id', (request, reply) => {
    const { id } = request.params
    const video = database.list2(id)

    return video
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    database.update( videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

# Está operação buscar por um id e faz a deleção do banco de dados
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 9999,
})
```

* Criamos uma função na class da memoria interna para deletar as informações de um filme 
```
import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()


create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

list(search){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

        return {
            id, 
            ...data,
        }
        }).filter(video => {
            if (search) {
                return video.title.includes(search)
            }
        
            return true
        })
    }


list2(id){
        const video = this.#videos.get(id)
        return video
    }

update(id, video){
        this.#videos.set(id, video)
    }

# Está operação faz a busca através do id para deletar as da base de dados.
delete(id){
        this.#videos.delete(id)
    }

}
```
### Desenvolvimento Framework e Banco de Dados

```
# Vamos instalar uma biblioteca do Postgres para o Node 
npm install postgres

Documentação: https://github.com/porsager/postgres

# Criamos um banco de Dados no Neon
Link: https://console.neon.tech/

#Criamos um arquivo ".env" e passamos as variaveis de ambiente passadas pelo Neon
npm install dotenv -D

importamos "import 'dotenv/config'" no arquivo de banco para abrir o arquivo .env e salvara as variaveis em uma variavel.

# Pegamos restante das variaveis do Neon para o arquivo de Banco de Dados

# Criamos tabela no Banco
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INT
);

# Tivemos que modificar as chamasdas para o banco, pois anteriormenmte era feito uma chamada local, e agora temos que apontar para o banco na nuvem.

# Vamos criar conta no render para deployar esse cara
```



