//use the app.js instead

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    console.log(req.url, req.method)

    //set header content type
    res.setHeader('Content-Type', 'text/html')
    
    //routing
    let path = './views/';
    res.statusCode= 200;
    switch(req.url){
        case '/':
            path+= 'index.html'//adds the 'index.html' to the './views/' path
            break;
        case '/about':
            path+= 'about.html'
            break;
        default:
            path+= '404.html'
            res.statusCode= 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err,data) => {
        if (err){
            console.log(err)
            res.end();
        }
        else{
            res.write(data)//data should be content in the index.html file
            res.end();
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
})