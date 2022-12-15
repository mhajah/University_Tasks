"use strict";
exports.__esModule = true;
exports.logPerson = exports.isUser = exports.isAdmin = void 0;
var X = {
    typ: 'User',
    name: 'Michal',
    age: 20,
    occupation: 'Student'
};
var Y = {
    typ: 'Admin',
    name: 'Tomasz',
    age: 50,
    role: 'CEO'
};
function isAdmin(person) {
    return 'role' in person;
}
exports.isAdmin = isAdmin;
function isUser(person) {
    return 'occupation' in person;
}
exports.isUser = isUser;
function logPerson(person) {
    var additionalInformation = '';
    if (person.typ === 'Admin') {
        additionalInformation = person.role;
    }
    if (person.typ === 'User') {
        additionalInformation = person.occupation;
    }
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(additionalInformation));
}
exports.logPerson = logPerson;
logPerson(X);
logPerson(Y);
