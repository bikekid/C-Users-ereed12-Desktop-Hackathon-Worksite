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
        this.allBuddies = allBuddies;
        this.buddies = allBuddies;
        this.user = user;
        this.filterIndex = 0;
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
        this.filterIndex = index;
        let currPref = this.user.ranking[index];
        if (currPref == "substance") {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].substance != this.user.substance) {
                    currBuddies.splice(i, 1);
                    i--;
                }
            }
        } else if (currPref == "gender") {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].gender != this.user.genderPref) {
                    currBuddies.splice(i, 1);
                    i--;
                }
            }
        } else {
            for (let i = 0; i < currBuddies.length; i++) {
                if (currBuddies[i].age < this.user.ageLowerBound ||
                    currBuddies[i].age > this.user.ageUpperBound) {
                    currBuddies.splice(i, 1);
                    i--;
                }
            }
        }

        if (currBuddies.length == 0) {
            if (index + 1 <= ranking.length - 1) {
                prefFilter(index + 1, this.buddies);
            } else {
                return;
            }
        } else {
            this.buddies = currBuddies;
        }
    }


}