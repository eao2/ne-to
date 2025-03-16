module.exports = { apps: [ 
    { name: 'ne-to',
        script: './.output/server/index.mjs',
        exec_mode: 'cluster',
        instances: 'max',
        env: {
            PORT: 3000,
            NITRO_PORT: 3000,
            NODE_ENV: 'production',
            DATABASE_URL: "mysql://admin:neto24@localhost:3306/neto",
            JWT_SECRET: "BC879C9583AD29F34FACC7970B36C1E58D8ABBC785025B3A197BB0A4655669C6",
            BASE_URL: "https://ne-to.com",
            RESEND_API_KEY: 're_DnvsftyF_NHWKqBaMSwsDSeQJHe5E54Gz'
        }
    }
    ]
}
