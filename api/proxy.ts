import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { RestManager } from 'studo.js';

export const handler: Handler = async (event, context) => {
  const endpoint = event.path.split('/proxy/')[1];

  // remove host and add other necessary headers
  const { host, ...headers } = event.headers;
  headers['user-agent'] = 'studo.js/android';
  headers['application-id'] = 'com.moshbit.studo';

  // validate
  if (!endpoint || !/^\w+(\/\w+)*\/?$/.test(endpoint)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ proxy_error: 'invalid endpoint' }),
    };
  }

  try {
    const response = await fetch(`${RestManager.baseURL}/${endpoint}`, {
      method: event.httpMethod,
      body: event.body,
      headers,
      timeout: 10_000,
    });

    return {
      statusCode: response.status,
      body: await response.text(),
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ proxy_error: error.toString() }),
    };
  }
};
