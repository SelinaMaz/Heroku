/**
 * Simple database insertion and query for MongoDB
 * @author: Selina Mazzaro
 */
import Mongo = require("mongodb");
console.log("Database starting");

let databaseURL: string = "mongodb://localhost:27017/Test";
let db: Mongo.Db;
let students: Mongo.Collection;

if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://SelinaMaz:eia2-mlab@ds143542.mlab.com:43542/eia2-mlab";

Mongo.MongoClient.connect(databaseURL, handleConnect);

function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}

export function insert(_doc: StudentData): void {
    students.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}

export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = students.find();
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, studentArray: StudentData[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}

//export function search(_callback: Function): void {
//    var search: Mongo.Cursor = students.find();
//    search.toArray(prepareAnswer);
//
//    let name: StudentData;
//    let matrikel: StudentData;
//
//    function prepareAnswer(_name, _matrikel): void {
//        if (_name)
//            _callback(JSON.stringify(name));
//        if (_matrikel)
//            _callback(JSON.stringify(matrikel));
//        else
//            _callback("Der/die Stundent/-in ist nicht in unserer Datenbank.");
//    }
//}