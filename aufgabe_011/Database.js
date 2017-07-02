"use strict";
/**
 * Simple database insertion and query for MongoDB
 * @author: Selina Mazzaro
 */
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017/Test";
let db;
let students;
if (process.env.NODE_ENV == "production")
    databaseURL = "mongodb://SelinaMaz:eia2-mlab@ds143542.mlab.com:43542/eia2-mlab";
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db;
        students = _db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
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
//# sourceMappingURL=Database.js.map