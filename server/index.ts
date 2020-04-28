import * as SerialPort from "serialport";
import * as fastify from "fastify";

import config = require("../config.json");

const serialPort = new SerialPort(config.serialPort, { baudRate: 115200 });
serialPort.on('error', error => {
    if (error) {
        console.log(error);
    }
});

const server = fastify({});
server.register(require('fastify-cors'), { 
    origin: true,
})

function getDegrees(value: number): number {
    const v = Math.min(Math.max(value, 0), 100) / 100;
    return Math.round(Math.acos(1 - 2 * v) * 180 / Math.PI);
}

const opts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                value: { type: 'integer',  minimum: 0, maximum: 100 }
            },
            required: ['value']
        }
    }
}

server.put("/resistance", opts, async (request, reply) => {
    const { value } = request.body;
    if (!serialPort.isOpen) {
        serialPort.open();
    }

    return new Promise((resolve, reject) => {
        const listener = () => { 
            resolve({ value }); 
            serialPort.off('data', listener);
        };
        serialPort.on('data', listener);
        const degrees = getDegrees(value);
        serialPort.write(Buffer.from([degrees]), error => { 
            if (error) {
                reject(error);
            }
        });
    });
});

server.listen(4000, '0.0.0.0', err => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    server.log.info(`server listening on ${server.server.address()}`)
})