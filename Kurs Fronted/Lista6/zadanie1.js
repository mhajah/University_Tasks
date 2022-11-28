const user = {
    name: "Alice",
    surname: "Young",
    dates: {
      birthDate: new Date(1995, 10, 28)
    },
    contact: {
      phone: '111-111-111',
      address: {
        city: "London",
      }
    }
  };


/**
 * Zwraca sklonowany obiekt.
 * @param {Object} user 
 */
function cloneDeep(user) {
    let userCp = {};
    for (const property in user) {
        let value = user[property];
        if (value instanceof Object) {
            if (value instanceof Date) {
                userCp[property] = new Date(value.getTime());
            } else 
                userCp[property] = cloneDeep(value);
        } else 
            userCp[property] = value;
    }

    return userCp;
}

const userCp = cloneDeep(user);

user.name = "John";
user.surname = "White";
user.dates.birthDate = new Date(1999, 11, 11);
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'

console.log(user);
/*
{ 
  name: 'John',
  surname: 'White',
  dates: {
    birthDate: Sat Dec 11 1999 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
  },
  contact: { 
    phone: '222-222-222', 
    address: { 
      city: 'New York' 
    } 
  } 
}
*/
console.log(userCp);
/*
{ 
  name: 'Alice',
  surname: 'Young',
  dates: {
    birthDate: Tue Nov 28 1995 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
  },
  contact: { 
    phone: '111-111-111', 
    address: { 
      city: 'London' 
    } 
  } 
} 
*/