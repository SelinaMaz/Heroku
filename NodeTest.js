"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
let port = process.env.PORT; // env= information about environment in dem Fall �ber den PORT
if (port == undefined)
    port = 8100; //wenn der Port nicht bereits definiert ist soll er 8100 sein.
let server = Http.createServer(); //ein HTTP-Server wird erstellt
server.addListener("listening", handleListen); // Listener an Server
server.addListener("request", handleRequest); // Listener an Antwort
server.listen(port); // Server soll auf ausgegebenen PORT h�ren
function handleListen() {
    console.log("Listening on port: " + port); // Konsole gibt PORT an
}
function handleRequest(_request, _response) {
    // IncomingMessage = wird automatisch von Server erstellt und sendet Parameter an requestListener
    //                   Methoden: GET, POST
    // ServerResponse  = wird automatisch von Server erstellt und sendet Parameter an requestListener
    //                   setHeader, write, end
    console.log("Request received");
    console.log(_request.url); //url soll ausgegeben werden
    let query = Url.parse(_request.url, true).query;
    // query = vom Typ AssocStringStrin 
    //         die Url wird geparsed (zu einem JS-Objekt), wird zu einem boolean. Aus dem boolean wird query.
    console.log(query);
    let key;
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8"); // als Response wird Header angelegt 
    for (key in query) {
        if (query[key] == "0") {
            continue;
        }
        _response.write(key + ":" + " " + query[key] + "\n");
    }
    //    _response.setHeader("Access-Control-Allow-Origin", "*");
    //    _response.setHeader("content-type", "text/html; charset=utf-8"); // als Response wird Header angelegt 
    //    _response.write("Ich höre Stimmen!"); // in HTML wird "ich h�re Stimmen" geschrieben.
    //    _response.write("Ich kann auch Stimmen hören :D");
    //    _response.write(query); // A2.2 Response so angepasst dass query-Daten auch in Response auftauchen.
    _response.end();
}
//# sourceMappingURL=NodeTest.js.map