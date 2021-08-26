import { Handler } from '@netlify/functions';
import { RestManager } from 'studo.js';

export const handler: Handler = async (event) => {
  const endpoint = event.path.substr('/api/proxy/'.length);

  if (!endpoint || !/^\w+(\/\w+)*\/?$/.test(endpoint)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ proxy_error: 'invalid endpoint' }),
    };
  }

  try {
    const response = await RestManager.request(
      event.httpMethod,
      endpoint,
      { body: event.body },
      event.headers['session-token']
    );

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
