module.exports = ({ env }) => ({
    upload: {
        config: {
          sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
          providerOptions: {
            localServer: {
              maxage: 300000
            },
          },
          breakpoints: {
            xlarge: 1920,
            large: 1000,
            medium: 750,
            small: 500,
            xsmall: 64
          },
        },
    },
    io: {
        enabled: true,
        config: {
            socket: {
                serverOptions: {
                    cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
                }
            },
            contentTypes: [{ uid: 'api:messages', actions: ['create'] }],
            events: [
                {
                    name: 'connection',
                    handler: ({ strapi }, socket) => {
                        strapi.log.info(`[io] new connection with id ${socket.id}`)

                        socket.on('client-message', (messageData) => {
                            socket.emit('server-message', messageData)
                        })
                    }
                }
            ]
        }
    }
});
