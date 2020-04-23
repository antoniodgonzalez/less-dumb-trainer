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

server.put("/value", async (request, reply) => {
    const { value } = request.body;
    if (!serialPort.isOpen) {
        serialPort.open();
    }

    return new Promise((resolve, reject) => {
        const listener = ([value]) => { 
            resolve({ value }); 
            serialPort.off('data', listener);
        };
        serialPort.on('data', listener);
        serialPort.write(Buffer.from([value]), error => { 
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