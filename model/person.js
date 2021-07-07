/**
 * @description Class to model the entity Person
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict"

class Person {
    constructor({ name, email, dateOfBirth }) {
        this.name = this.validateName(name);
        this.email = this.validateEmail(email);
        this.date_of_birth = this.validateDateOfBirth(dateOfBirth);
    }

    validateName(name) {
        if (typeof name === "undefined" || name === null || name === "") {
            throw new Error("The name is empty! A name with less than 50 characters must be provided.");
        }

        if (typeof name === "string" && name.length <= 50) {
            return name;
        } else {
            throw new Error("The name is invalid! It's not a text or its length is greater than 50 characters.");
        }
    }

    validateEmail(email) {
        if (typeof email === "undefined" || email === null || email === "") {
            return null;
        }

        if (typeof email === "string") {
            const emailRegex = /.+@{1}.+[.]{1}.+/;
            const isCorrect = emailRegex.test(email);

            if (isCorrect) {
                return email;
            } else {
                throw new Error("The email is in an incorrect format!");
            }
        } else {
            throw new Error("The email is in an incorrect format!");
        }
    }

    validateDateOfBirth(dateOfBirth) {
        if (typeof dateOfBirth === "undefined" || dateOfBirth === null || dateOfBirth === "") {
            return null;
        }

        if (typeof dateOfBirth === "string") {
            const dateRegex = /[12][0-9]{3}-(0[1-9]|1[1-2])-0[1-9]|[1-2][0-9]|3[0-1]/;
            const isCorrect = dateRegex.test(dateOfBirth);

            if (!isCorrect) {
                throw new Error("The date is incorrect! The format must be: YYYY-MM-DD.");
            }

            const today = new Date();
            if (dateOfBirth > today) {
                throw new Error("The date must be in the past.");
            }

            return dateOfBirth;
        } else {
            throw new Error("The date is incorrect.");
        }
    }

    static sanitizeDateOfBirth(date) {
        if (date !== null) {
            date = date.slice(0, 10);
        }

        return date;
    }

    static sanitizePersons(data) {
        let result = {
            persons: []
        };

        data.forEach(person => {
            result.persons.push({
                id: person.id,
                name: person.name,
                email: person.email,
                dateOfBirth: this.sanitizeDateOfBirth(person.date_of_birth)
            });
        });

        return result;
    }

    static sanitizePerson(data) {
        const result = {
            person: {
                id: data[0].id,
                name: data[0].name,
                email: data[0].email,
                dateOfBirth: this.sanitizeDateOfBirth(data[0].date_of_birth)
            }
        }

        return result;
    }
}

module.exports = Person;