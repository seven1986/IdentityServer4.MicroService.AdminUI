// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    SERVER_URL: `./`,
    hmr: false,
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
