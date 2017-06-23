console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString { //neuer Typ
    [key: string]: string;
}

let port: number = process.env.PORT; // env= information about environment in dem Fall über den PORT
if (port == undefined)
    port = 8100; //wenn der Port nicht bereits definiert ist soll er 8100 sein.

let server: Http.Server = Http.createServer(); //ein HTTP-Server wird erstellt
server.addListener("listening", handleListen); // Listener an Server
server.addListener("request", handleRequest);  // Listener an Antwort
server.listen(port); // Server soll auf ausgegebenen PORT hören

function handleListen(): void {
    console.log("Listening on port: " + port); // Konsole gibt PORT an
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    // IncomingMessage = wird automatisch von Server erstellt und sendet Parameter an requestListener
    //                   Methoden: GET, POST
    // ServerResponse  = wird automatisch von Server erstellt und sendet Parameter an requestListener
    //                   setHeader, write, end
    console.log("Request received");

    console.log(_request.url); //url soll ausgegeben werden
    let query: AssocStringString = Url.parse(_request.url, true).query;
    // query = vom Typ AssocStringStrin 
    //         die Url wird geparsed (zu einem JS-Objekt), wird zu einem boolean. Aus dem boolean wird query.
    console.log(query);
    let key: string;
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8"); // als Response wird Header angelegt 

    _response.write("Vielen Dank für Ihre Bestellung. Sie wird in kürze bearbeitet");
    for (key in query) {//nicht definiert wie lange sie läuft
        if (query[key] == "0") {
            continue;
        }
        _response.write(key + ":" + " " + query[key] + "<br>");
    }

    //    _response.setHeader("Access-Control-Allow-Origin", "*");
    //    _response.setHeader("content-type", "text/html; charset=utf-8"); // als Response wird Header angelegt 
    //    _response.write("Ich hÃ¶re Stimmen!"); // in HTML wird "ich höre Stimmen" geschrieben.
    //    _response.write("Ich kann auch Stimmen hÃ¶ren :D");
    //    _response.write(query); // A2.2 Response so angepasst dass query-Daten auch in Response auftauchen.
    _response.end();
}