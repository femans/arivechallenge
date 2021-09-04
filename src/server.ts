'use strict';
import Hapi from "@hapi/hapi";
import config from "./config"
import { Server } from "@hapi/hapi";

import {routes} from './routes'

import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import Swagger from './plugins/swagger';
import mongoose from "mongoose";

const server: Server = Hapi.server({
    port: config.server.port
})

const plugins: any[] = [
    Inert,
    Vision,
    Swagger
];

export const init = async () => {
    server.route(routes);
    await server.initialize();
    return server;
};

export const start = async () => {
    await mongoose.connect(config.database.connectionString)
        .then(() => console.log("successfully connected to database"))
        .catch(console.error);

    await server.register(plugins);

    server.route(routes);
    await server.start();
    console.log(`Listening on ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});
