import http from 'http'

async function injectHttpInterceptor() {
    const originalEmit = http.Server.prototype.emit

    http.Server.prototype.emit = function(...args) {
        const [type, _, response] = args

        if ( type === 'request') {
            response.setHeader('X-Instrumented-By', 'Thais')
        }

        return originalEmit.apply(this, args)
    }
}

export { injectHttpInterceptor }