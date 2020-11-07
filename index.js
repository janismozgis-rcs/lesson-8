import http from 'http';
import path from 'path';
import fs from 'fs';

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);


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

    let htmlFilePath = '';

    switch (req.url) {
        case '/index':
        case '/':
            htmlFilePath = path.join(dirname, 'public', 'content', 'index.html');
            break;
        case '/about-us':
            htmlFilePath = path.join(dirname, 'public', 'content', 'about-us.html');
            break;
        case '/articles':
            htmlFilePath = path.join(dirname, 'public', 'content', 'articles.html');
            break;
        default:
            htmlFilePath = path.join(dirname, 'public', 'content', '404.html');
    }
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    const htmlHeaderPath = path.join(dirname, 'public', 'parts', 'header.html');
    const htmlHeaderContent = fs.readFileSync(htmlHeaderPath, 'utf8');
    const htmlFooterPath = path.join(dirname, 'public', 'parts', 'footer.html');
    const htmlFooterContent = fs.readFileSync(htmlFooterPath, 'utf8');

    const content = htmlHeaderContent + htmlContent + htmlFooterContent;

    res.end(content);
});
server.listen(3000, () => {
    console.log('Server is up and running');
});