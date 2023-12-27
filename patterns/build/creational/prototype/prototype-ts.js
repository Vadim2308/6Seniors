"use strict";
class UserHistory {
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.createdAt = new Date();
    }
    clone() {
        const target = new UserHistory(this.email, this.name);
        target.createdAt = this.createdAt;
        return target;
    }
}
const user = new UserHistory('a@a.ru', "Vadim");
console.log(user);
const user2 = user.clone();
