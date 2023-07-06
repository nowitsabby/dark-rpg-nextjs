/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./scripts/cache')
        }
    
        return config
    },
}

module.exports = nextConfig
