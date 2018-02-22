interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    clientID: '5hzANeHAfFubEnWVynS3vFGXK2sCMlv7',
    domain: 'd4dt.auth0.com',
    callbackURL: location.host.includes('localhost')? 'http://localhost:4200/callback': 'https://' + location.host + '/callback'
  };