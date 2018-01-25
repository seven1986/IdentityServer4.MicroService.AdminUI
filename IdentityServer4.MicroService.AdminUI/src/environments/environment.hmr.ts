export const environment = {
  SERVER_URL: `./`,
  hmr: true,
  useHash: false,
  production: false,
  ApiServer: 'https://localhost:44347',
  IdentityServer: {
    authority: 'https://localhost:44347',
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
