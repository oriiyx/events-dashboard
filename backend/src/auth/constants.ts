const secretKey = '65d490d3-5fdc-48e5-9490-d35fdc18e549';

function getSecret() {
    return Buffer.from(secretKey).toString('base64');
}

function decodeSecret() {
    return Buffer.from(secretKey, 'base64').toString('utf-8');
}

export const jwtConstants = {
    secret: secretKey
};

