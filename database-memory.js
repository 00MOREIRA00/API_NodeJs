import { randomUUID } from "crypto"

export class DataBaseMemory {
    #videos = new Map()

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

    create(video){
        //UUID - Universal Unique ID
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}

/*
Para criar essa Base de Dados local, vamos criar uma class onde ao invés de usar uma Array para armazenar as informações, vamos utilizar um Map, pois dessa forma não temos riscos de 
duplicidade de Id.

Usamos um # antes do nome do Map para garantir que somente aquela aplicação o verá.

CRIAR 
Criarmos uma função que recebe como parametro o video, porém no processo ele criar uma variavel com um código de identificação com um "randomUUID" que será utilizado como identificador
do video.

LISTAR
Inicialmente somente fariamos um "return this.#videos.values()" para pegar o retorno, porém temos dois problemas nessa forma, que são:
    -Não temos o id dos videos
    -O retorno não volta em um formato correto

Para corrigir temos que fazer duas coisas:
    -Para corrigir o primeiro ponto nós tranformamos o retorno em um Array
    "return Array.from(this.#videos.values())"

    -Para o corrigir o problema do Id
    list(){
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

        return {
            id, 
            ...data,
        }
        })
    }
Nesse caso nós mudamos de "value" para "entries" onde podemos usar o metodo map que vai receber a solicitação e desestruturar para pegar o id e o resto dos dadoss 


*/

/*
Query parameter podem ser usados para facilitar uma busca, nesse caso eu utilizei na função de buscar todos os videos.

.filter(video => {
            if (search) {
                return video.title.includes(search)
            }
        
        return true
    }

Adicionei ao final um filter onde ele recebe como parametros todos os videos de forma sequencial e olha no titulo se tem o item passado em search. É utilizado o include para que a 
resposta seja em boolean, caso tenha a palavra ele retorna um false, caso não tenha retorna um true
    
*/