module.exports = {
    // other configs...

    // future: { webpack5: true }, // -- not needed since Next.js v11.0.0
    webpack(config) {
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] },
            type: 'asset/resource',
        });
        return config;
    },
};