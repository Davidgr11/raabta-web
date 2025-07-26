// Script para probar la función get-access localmente
// Usar: node test-function.js

const { handler } = require('./netlify/functions/get-access.js');

// Simular variables de entorno para prueba local
process.env.JSONBIN__API__KEY = 'tu-api-key-aqui';
process.env.JSONBIN__BIN__ID = 'tu-bin-id-aqui';

async function testFunction() {
    console.log('🧪 Probando función get-access...');
    
    try {
        const result = await handler({}, {});
        console.log('✅ Resultado:', {
            statusCode: result.statusCode,
            body: JSON.parse(result.body)
        });
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testFunction();
