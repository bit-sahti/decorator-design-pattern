import http from 'http'
import { injectHttpInterceptor } from '../src/agent.js'

injectHttpInterceptor()

function handleRequest(_, response) {
    response.end('Hello World')
}

const server = http.createServer(handleRequest)
const port = 3000

server.listen(port, () => console.log(`Server running at port ${server.address().port}`))