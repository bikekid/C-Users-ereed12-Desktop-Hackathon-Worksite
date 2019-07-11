class User {
    
    constructor(id, firstName, lastName, gender, dob, substance, range,
        genderPref, ageLowerBound, ageUpperBound, ranking) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
        this.substances = substance;
        this.range = range;
        this.genderPref = genderPref;
        this.ageLowerBound = ageLowerBound;
        this.ageUpperBound = ageUpperBound;
        this.ranking = ranking;
    }

    addBio(bio) {
        this.bio = bio;
    }

    addPicture(picture) {
        this.picture = picture;
    }

    distance(buddy) {
        //use external api to calculate distance between buddy and user's current location
    }

    changePreferences(newRanking) {
        this.ranking = newRanking;
    }

}

class Buddy {

    constructor(id, firstName, lastName, gender, dob, substance) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
        this.substance = substance;
    }

    addBio(bio) {
        this.bio = bio;
    }

    addPicture(picture) {
        this.picture = picture;
    }

}

class UserScreen {

    constructor(allBuddies, user) {
        this.buddies = allBuddies;
        this.user = user;
    }

    distanceFilter() {
        for (let i = 0; i < this.buddies.length; i++) {
            if (this.user.distance(this.buddies[i]) > this.user.range) {
                this.buddies.splice(i, 1);
                i--;
            }
        }
    }

    prefFilter(index, currBuddies) {
        let removed = [];
        let currPref = this.user.ranking[index];
        if (currPref == "substance") {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].substance != this.user.substance) {
                    removed.push(currBuddies.splice(i, 1));
                    i--;
                }
            }
        } else if (currPref == "gender") {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].gender != this.user.genderPref) {
                    removed.push(currBuddies.splice(i, 1));
                    i--;
                }
            }
        } else {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].age < this.user.ageLowerBound ||
                    currBuddies[i].age > this.user.ageUpperBound) {
                    removed.push(currBuddies.splice(i, 1));
                    i--;
                }
            }
        }

        if (currBuddies.length == 0) {
            if (index + 1 <= ranking.length - 1) {
                return prefFilter(index + 1, this.buddies);
            } else {
                return this.buddies;
            }
        } else {
            return currBuddies;
        }
    }
}