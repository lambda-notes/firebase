// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

module.exports = {
    find,
    findByCohortId,
    insert,
    remove,
    update
};

function find() {
    return db('sprints');
}

function findByCohortId(id) {
    return db('sprints').where({ cohortID: id });
}

// Finish all below this line later

function insert(creds) {
    return db('sprints')
        .insert(creds)
        .then(ids => ids);
}

function update(id, changes) {
    return db('sprints')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('sprints')
        .where({ id })
        .del();
}
