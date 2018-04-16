export const environment = {
  SERVER_URL: `./`,
  hmr: true,
  useHash: false,
  production: false,
  ApiServer: 'https://localhost:44309',
  IdentityServer: {
    authority: 'https://localhost:44309',
    client_id: 'adminportal'
  },
  ApimSubscription:
  [
    //{
    //  subPath: '/ids/',
    //  subKey: '28f9cac6b28348a0b3950603eee5b2ec'
    //},
    //{
    //  subPath: '/game/',
    //  subKey: '345e19daf1ce48189b1f7f311e475d5f'
    //}
  ]
};
