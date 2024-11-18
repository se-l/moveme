import {w3cwebsocket as W3CWebSocket} from 'websocket';

type RequestHandler = (data: any) => void;

export class WebsocketWrapper {
    private ws: W3CWebSocket;
    private requestHandlers: Map<string, RequestHandler>;

    constructor(url: string) {
        this.ws = new W3CWebSocket(url);
        this.requestHandlers = new Map<string, RequestHandler>([
            ['default', (data: any) => console.log(data)]
        ])

        this.ws.onmessage = (message: any) => {
            const data = JSON.parse(message.data);
            const handler = this.requestHandlers.get(data.requestId);
            if (handler) {
                handler(data);
            }
        };
    }

    sendRequest(request: any, handler: RequestHandler) {
        this.requestHandlers.set(request.requestId, handler);
        this.ws.send(JSON.stringify(request));
    }
}