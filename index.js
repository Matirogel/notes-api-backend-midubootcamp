const app = express()
const express =  require('express')
const logger = require('./loggerMiddleware')
const cors = require('.cors')


app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
    {
        id: 1, 
        name: "Pep",
        important: true,
        age: 20
    },
    {
        id: 2,
        name: "Mou",
        important: true,      
        age: 33
    },
    {
        id: 3,
        name: "Marcelo",
        important: true,
        age: 12
    }
]

// const app = http.createServer((request, response) => {        // createServer() recibe un callback, en este caso es una funcion que se ejecuta cada vez que llegue una request
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })  


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        name: note.name,
        important: typeof note.important !== "undefined" ? note.important : false,
        age: note.age
    }

    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

app.use((request, response) => {
    console.log("aqui esta el error")
    response.status(404).json({
        error: 'not found'
    })
})


const PORT = process.env.PORT || 3001

app.listen( PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})


