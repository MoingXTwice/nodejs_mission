const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${process.env.domain}/privkey.pem`, 'utf8');
const certificate = fs.readFileSync(`/etc/letsencrypt/live/${process.env.domain}/cert.pem`, 'utf8');
const ca = fs.readFileSync(`/etc/letsencrypt/live/${process.env.domain}/chain.pem`, 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.listen(3000, () => {
    console.log(3000, '번으로 서버가 연결되었습니다.');
});

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
})