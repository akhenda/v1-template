import { log as logtail } from '@logtail/next';
import { consola } from 'consola';

export const log = process.env.NODE_ENV === 'production' ? logtail : consola;
