import http from 'http'
import { jest } from '@jest/globals'
import { injectHttpInterceptor } from './agent.js'

describe('HTTP Interceptor Agent', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    const originalHttp = jest.createMockFromModule('http')
    const eventName = 'request'
    const request = null

    it('should not change headers', () => {
        const response = {
            setHeader: jest.fn().mockReturnThis()
        }

        const serverInstance = new originalHttp.Server()

        serverInstance.emit(eventName, request, response)

        expect(response.setHeader).not.toHaveBeenCalled()
    })

    it('should activate header interceptor', () => {
        injectHttpInterceptor()

        const response = {
            setHeader: jest.fn().mockReturnThis()
        }

        const serverInstance = new http.Server()

        serverInstance.emit(eventName, request, response)

        expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Thais')
    })
})