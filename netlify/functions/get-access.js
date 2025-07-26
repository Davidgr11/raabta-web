exports.handler = async function (event, context) {
    const fetch = require('node-fetch');
    const JSONBIN_API_KEY = process.env.JSONBIN__API__KEY;
    const JSONBIN_BIN_ID = process.env.JSONBIN__BIN__ID;

    console.log('Function invoked, checking environment variables...');
    console.log('API Key exists:', !!JSONBIN_API_KEY);
    console.log('Bin ID exists:', !!JSONBIN_BIN_ID);

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
        console.log('Making request to JSONBin...');
        const url = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY,
            },
        });

        console.log('JSONBin response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('JSONBin error:', errorText);
            throw new Error(`JSONBin API error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('Data received successfully');
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Function error:', error.message);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: error.message,
                timestamp: new Date().toISOString()
            }),
        };
    }
}