/************************************/
/* Setting up the static file server*/
let static = require('node-static');

/* Set up http server */
let http = require('http');

/* Assume that we are running on Heroku */
let PORT = process.env.PORT;
let directory = __dirname + '/public';

/* If we aren't on Heroku then we need to adjust our port and directory */
if ((typeof PORT == 'undefined') || (PORT === 'null')) {
    PORT = 8080;
    directory = './public';
}

/* Set up our static file web server to deliver files from the file system */
let file = new static.Server(directory);

let app = http.createServer(
    function(request,response){
        request.addListener ('end',
            function(){
                file.serve(request, response);
            }
        ).resume();
    }
).listen(PORT);

console.log('The server is running');