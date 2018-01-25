export const environment = {
  SERVER_URL: `./`,
  hmr: false,
  useHash: false,
  production: true,
  ApiServer: 'https://openapis.ixingban.com',
  IdentityServer: {
    authority: 'https://ids.ixingban.com',
    client_id: 'adminportal'
  },
  ApimSubscription:
  [
    {
      subPath: '/ids/',
      subKey: 'af2e835201804caa8bec3cb8bc898af5'
    },
    {
      subPath: '/game/',
      subKey: '345e19daf1ce48189b1f7f311e475d5f'
    }
  ]
};
