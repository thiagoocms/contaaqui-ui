declare let require: any;

function getVersion(): string {
  let version = '0.0.0';
  try {
    version = require('../../package.json').version;
  } catch (e) {
    // fallback if require is not available in the bundler
  }

  const date = new Date();
  const dateString = date.toLocaleString();

  return `${version}-dev (${dateString})`;
}

export const environment = {
  APP_VERSION: getVersion(),
  BASE_URL: 'http://ec2-100-52-199-136.compute-1.amazonaws.com:5000/conta-aqui-service/api',
};

export const AUTH = {
  TOKEN_KEY: "authToken",
  HASH_KEY: "hash"
}

export const GLOBAL = {
  USER_KEY: "user"
}
