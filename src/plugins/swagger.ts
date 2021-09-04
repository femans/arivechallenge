import * as HapiSwagger from 'hapi-swagger';

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: "Arive Challenge FTW",
        version: "1337"
    }
};

export default {
    plugin: HapiSwagger,
    options: swaggerOptions
};