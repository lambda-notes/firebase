// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

module.exports = {
    find,
    findById,
    insert,
    remove,
    update
};

function find() {
    return db('track');
}

function findById(id) {
    return db('track')
        .where({ id })
        .first();
}

function insert(track) {
    return db('track')
        .insert(track)
        .then(ids => ids);
}

function update(changes, id) {
    return db('track')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('track')
        .where({ id })
        .del();
}
