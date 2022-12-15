"use strict";
exports.__esModule = true;
exports.persons = void 0;
exports.persons = [
    {
        name: 'Jan Kowalski',
        age: 17,
        occupation: 'Student'
    },
    {
        name: 'Tomasz Malinowski',
        age: 20,
        role: 'Administrator'
    },
];
//Strażnik typu
function isAdmin(p) {
    return 'role' in p;
}
function logPerson(person) {
    var additionalInformation;
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    else {
        additionalInformation = person.occupation;
    }
    console.log(" - ".concat(person.name, ", ").concat(person.age, ", ").concat(additionalInformation));
}
logPerson(exports.persons[0]);
logPerson(exports.persons[1]);
