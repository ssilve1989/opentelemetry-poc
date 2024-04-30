import { Inject } from '@nestjs/common';

export const LOGGER_INSTANCE = '@logger/instance';

export const InjectLogger = () => Inject(LOGGER_INSTANCE);
export const getLoggerToken = () => LOGGER_INSTANCE;
