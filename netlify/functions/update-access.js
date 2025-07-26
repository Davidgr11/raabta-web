exports.handler = async function (event, context) {
    const fetch = require('node-fetch');
    const JSONBIN_API_KEY = process.env.JSONBIN__API__KEY;
    const JSONBIN_BIN_ID = process.env.JSONBIN__BIN__ID;

    console.log('Update function invoked, checking environment variables...');
    console.log('API Key exists:', !!JSONBIN_API_KEY);
    console.log('Bin ID exists:', !!JSONBIN_BIN_ID);
    console.log('HTTP Method:', event.httpMethod);

    // Manejar preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
        };
    }

    // Verificar método HTTP
    if (event.httpMethod !== 'PUT' && event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ error: 'Method not allowed. Use PUT or POST.' }),
        };
    }

    if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
        console.error('Missing environment variables');
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Environment variables not set',
                details: {
                    hasApiKey: !!JSONBIN_API_KEY,
                    hasBinId: !!JSONBIN_BIN_ID
                }
            }),
        };
    }

    try {
        console.log('Processing update request...');
        console.log('Request body:', event.body);

        // Parsear el body del request
        if (!event.body) {
            throw new Error('No data provided in request body');
        }

        const requestData = JSON.parse(event.body);
        console.log('Parsed data:', requestData);

        console.log('Making PUT request to JSONBin...');
        const url = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY,
            },
            body: JSON.stringify(requestData)
        });

        console.log('JSONBin response status:', response.status);
        console.log('JSONBin response headers:', response.headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('JSONBin error response:', errorText);
            throw new Error(`JSONBin API error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('Update successful:', data);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                data: data,
                message: 'Datos actualizados correctamente'
            }),
        };
    } catch (error) {
        console.error('Function error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: error.message,
                timestamp: new Date().toISOString(),
                debug: {
                    hasBody: !!event.body,
                    httpMethod: event.httpMethod,
                    headers: event.headers
                }
            }),
        };
    }
}