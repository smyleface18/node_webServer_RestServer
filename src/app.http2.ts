import fs from 'fs';
import http2 from 'http2'


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
},(request, response) => {
    console.log(request.url)

    if (request.url === "/") {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        response.writeHead(200, {'content-type': 'text/html'})
        response.write(htmlFile);
        response.end();
        
    }
    else if (request.url === "/about") {
        response.writeHead(200, {'content-type': 'text/html'})
        response.write("<h1>ABOUT</h1>");
        response.end();
        
    }
        else if (request.url === "/js/app.js") {
            const FileJS = fs.readFileSync('./public/js/app.js', 'utf-8')
        response.writeHead(200, {'content-type': 'application/javascript'})
        response.write(FileJS);
        response.end();
        
    }
    else if (request.url === "/css/styles.css") {
        const FileCss = fs.readFileSync('./public/css/styles.css', 'utf-8')
        response.writeHead(200, {'content-type': 'text/css'})
        response.write(FileCss);
        response.end();
    } 
    else {

        //RestApi

        const data = {name: 'Jhon Doe', age:30, city: 'New York'} 
        response.writeHead(200, {'content-type': 'application/json'})
        response.end(JSON.stringify(data))
    }

})
server.listen(3000, () => {
    console.log("Server run port 3000");
})
