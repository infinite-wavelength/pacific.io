import { Express } from 'express';
import { Logger } from 'winston';
import config from 'config';
import { Errors } from '@pacific.io/common';
import { LoggerInstance } from '../resources/logger';
import Consumers from './consumers';
import Scheduler from './scheduler';

export default class Boot {
    private static LOGGER: Logger = LoggerInstance.logger;

    static boot(application: Express) {
        const port: number = config.get('port');
        application
            .listen(port, () => {
                Boot.LOGGER.warn(`Worker microservice running. Visit http://localhost:${port}`);
                Consumers.start();
                Scheduler.start();
            })
            .on('error', () => {
                Boot.LOGGER.info(Errors.APP_ERROR.description, ':', Errors.APP_ERROR.description);
            });
    }
}
