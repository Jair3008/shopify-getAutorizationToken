const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const port = 3000 || process.env.PORT

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log('Server running on port: ', port);
});

// HELPERS
const authorize = async (shop) => {
    const client_id = process.env.client_id;
    const scopes = process.env.scopes;
    const uri = process.env.redirect_url;
    // console.log(client_id,scopes,uri);
    return encodeURI(`https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${client_id}&scope=${scopes}&redirect_uri=${uri}`);
}

const redirect = async (code) => {
    console.log(code);
}

// ENDPOINTS

app.get('/api/shopify/authorize', async (req, res) => {
    return res.redirect(await authorize(req.query.shop));
})

app.get('/api/shopify/redirect', async (req, res) => {
    console.log(req.query.code);
    return res.json({
        autoizationToken: req.query.code
    });
})