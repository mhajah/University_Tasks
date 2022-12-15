import { persons } from "./zadanie4";

type User = {
    typ: 'User';
    name: string;
    age: number;
    occupation: string;
}

type Admin = {
    typ: 'Admin';
    name: string;
    age: number;
    role: string;
}

type Person = Admin | User

let X: Person = {
    typ: 'User',
    name: 'Michal',
    age: 20,
    occupation: 'Student'
}

let Y: Person = {
    typ: 'Admin',
    name: 'Tomasz',
    age: 50,
    role: 'CEO'
}

export function isAdmin(person: Person): person is Admin {
    return 'role' in person;
}
export function isUser(person: Person): person is User {
    return 'occupation' in person;
}
export function logPerson(person: Person) {
    let additionalInformation: string = '';
    if (person.typ === 'Admin') {
        additionalInformation = person.role;
    }
    if (person.typ === 'User') {
        additionalInformation = person.occupation;
    }
    console.log(` - ${ person.name }, ${ person.age }, ${ additionalInformation }`);
}

logPerson(X)
logPerson(Y)