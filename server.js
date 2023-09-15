import { fastify } from 'fastify'
import { DataBaseMemory } from './database-memory.js'
import { DataBasePostgres } from './database-postgres.js'


const server = fastify()
//const database = new DataBaseMemory()
const database = new DataBasePostgres


//Operação Health Life 
server.get('/', () => {
    return "The Api is Life"
})

//Operação de Criação de Video
server.post('/videos',  async (request, reply) => {
    const {title, description, duration} = request.body
    console.log({title, description, duration})


    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

//Operação de Consultar todos os Videos 
server.get('/videos',  async(request) => {
    const search = request.query.search
    console.log(search)

    const videos = await database.list(search)

    return videos
})

//Operação para pegar um video especifico
server.get('/videos/:id', async (request, reply) => {
    const { id } = request.params
    console.log(id)
    const video = await database.list2(id)
    console.log(video)

    return video
})

//Operação para atualizar a informação de um video
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body
    await database.update( videoId, {
        title,
        description,
        duration,
    })

    return reply.status(200).send()
})

//Operação para deletar um video
server.delete('/videos/:id', async(request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(200).send()
})


server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 9999,
})

//Quando temos que passar um parametro na Rota, como por exemplo: http://localhost:9999/videos/{idVideo}
/*Nesse caso nós utilizamos Route Parameter
    -Exemplo: '/videos/:id' - onde estipulamos o parametro com ":nomeParametro"
*/

//Quando queremos passar parametros mas não de forma obrigatória como nom caso da rota, podemos usar o Query Parameters
/*São parametros não obrigatórios que geralmente são usados com o intuito de filtragem, como por exemplo: Ao buscar um video, poderiamos usar buscar pelo nome e pelo genero*/