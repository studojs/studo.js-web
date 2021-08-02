import { Client, RestManager } from 'studo.js';

RestManager.proxyURL = `${location.origin}/api/proxy`;

const sessionToken = localStorage.sessionToken;
export const client = new Client(sessionToken);
Object.assign(window, { client });
