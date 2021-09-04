export default {
    server: {
        host: process.env.host || '0.0.0.0',
        port: parseInt(process.env.PORT || "1337", 10),
    },
    database: {
        connectionString: process.env.connectionString || "mongodb://localhost:27017/arive"
    }
};