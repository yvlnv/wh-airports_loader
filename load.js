const {Database} = require('sqlite3')
const db = new Database('./airports_db')
const airports = require('./airports.json')

function insert (airports, callback, db) {
    if (airports.length === 0) {
        callback(db)
    } else {
        const airport = airports.pop()
        db.run('INSERT INTO airports (icao, iata, name, city, state, country, elevation, lat, lon, tz) VALUES(?,?,?,?,?,?,?,?,?,?);', Object.values(airport), function (err) {
            insert(airports, callback, db)
        })
    }
}

function load (callback) {
    db.run('CREATE TABLE IF NOT EXISTS airports(id INTEGER PRIMARY KEY, icao TEXT, iata TEXT, name TEXT, city TEXT, state TEXT, country TEXT, elevation INTEGER, lat FLOAT, lon FLOAT, tz TEXT);', function (err) 
    { insert(airports, callback, db) })
}

module.exports = load
