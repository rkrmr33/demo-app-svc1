const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const { service, version, port } = require('./config');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'demo-app-svc1' },
    transports: [new winston.transports.Console()],
});

const app = express();

app.use(expressWinston.logger({
    winstonInstance: logger,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
    msg: 'HTTP {{req.method}} {{req.url}}',
}));

app.get('/', (req, res) => {
    res.json({
        service,
        version,
    });
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    next();
});

app.listen(port, () => {
    logger.info(`app listening on port: ${port}`);
});
