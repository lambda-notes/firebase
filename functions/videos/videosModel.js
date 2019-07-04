// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

module.exports = {
    find,
    findByLessonID,
    findByID,
    insert,
    remove,
    update
};

function find() {
    return db('videos');
}

function findByLessonID(id) {
    return db('videos').where({ lessonID: id });
}

function findByID(id) {
    return db('videos')
        .where({ id })
        .first();
}

function insert(video) {
    return db('videos')
        .insert(video)
        .then(newNote => newNote);
}

function update(changes, id) {
    return db('videos')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('videos')
        .where({ id })
        .del();
}
