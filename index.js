import http from 'http';
import path from 'path';
import fs from 'fs';
import url from 'url';
import handleUserRegistration from './userRegistration.js';

const filename = new URL(import.meta.url).pathname;
let dirname = path.dirname(filename);
dirname = './';
console.log(dirname);
const server = http.createServer((req, res) => {
    const fileExt = path.extname(req.url);
    if (fileExt !== '') {
        // load normal files
        const pathToNormalFiles = path.join(dirname, 'public', req.url);
        let normalFileContent;
        switch (fileExt) {
            case '.css':
                normalFileContent = fs.readFileSync(pathToNormalFiles, 'utf8');
                res.writeHead(200, { 'Content-Type': 'text/css' });
                break;
            case '.js':
                normalFileContent = fs.readFileSync(pathToNormalFiles, 'utf8');
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                break;
            case '.png':
                normalFileContent = fs.readFileSync(pathToNormalFiles);
                res.writeHead(200, { 'Content-Type': 'image/png' });
                break;
            case '.jpg':
                normalFileContent = fs.readFileSync(pathToNormalFiles);
                res.writeHead(200, { 'Content-Type': 'image/jpg' });
                break;
            case '.jpeg':
                normalFileContent = fs.readFileSync(pathToNormalFiles);
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                break;
            case '.ico':
                normalFileContent = fs.readFileSync(pathToNormalFiles);
                res.writeHead(200, { 'Content-Type': 'text/x-icon' });
                break;
        }


        res.end(normalFileContent);
        return;
    }


    const pageUrl = url.parse(req.url);

    switch (pageUrl.pathname) {
        case '/index':
        case '/':
            renderView('index.html', '', dirname, res);
            break;
        case '/about-us':
            renderView('about-us.html', '', dirname, res);
            break;
        case '/articles':
            renderView('articles.html', '', dirname, res);
            break;
        case '/registration-successfull':
            renderView('registration-successfull.html', '', dirname, res);
            break;
        case '/register':
            if (req.method === 'POST') {
                handleUserRegistration(req, res, (errorString) => {
                    renderView('register.html', errorString, dirname, res);
                });
            } else {
                renderView('register.html', '', dirname, res);
            }
            break;
        default:
            renderView('404.html', '', dirname, res);
    }
});
server.listen(3000, () => {
    console.log('Server is up and running');
});

function renderView(htmlFileName, errorString, dirname, res) {
    let htmlFilePath = path.join(dirname, 'public', 'content', htmlFileName);
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
    htmlContent = htmlContent.replace('{{errors}}', errorString);


    const htmlHeaderPath = path.join(dirname, 'public', 'parts', 'header.html');
    const htmlHeaderContent = fs.readFileSync(htmlHeaderPath, 'utf8');
    const htmlFooterPath = path.join(dirname, 'public', 'parts', 'footer.html');
    const htmlFooterContent = fs.readFileSync(htmlFooterPath, 'utf8');

    const content = htmlHeaderContent + htmlContent + htmlFooterContent;

    res.end(content);
}