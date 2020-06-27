const { google } = require('googleapis');

exports.handler = async (event) => {
  let params = event.queryStringParameters;
  const code = params.code;

  let token;

  try {
    console.log('Try get accesToken for', code);
    token = await getAccessToken(code);
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        message: 'Failed getting access token',
        error: err,
      }),
    };
  }

  async function getAccessToken(code) {
    const { CLIENT_SECRET, CLIENT_ID, REDIRECT_URIS } = process.env;

    let oAuth2Client = new google.auth.OAuth2(
      `${CLIENT_ID}`,
      `${CLIENT_SECRET}`,
      `${REDIRECT_URIS}`
    );

    try {
      let accessToken = await oAuth2Client.getToken(code);
      // await oAuth2Client.setCredentials(token.tokens);
      return accessToken;
    } catch (e) {
      throw e;
    }
  }

  return {
    statusCode: 302,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Cache-Control': 'no-cache',
      Location: `/?token=${token.tokens.access_token}`,
    },
    body: JSON.stringify({ event: token.tokens.access_token }),
  };
};
