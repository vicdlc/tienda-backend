const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('🔴 Error en Redis:', err));
redisClient.on('connect', () => console.log('🔵 Conectado exitosamente a Redis'));

redisClient.connect();

module.exports = redisClient;