const mongoose = require('mongoose');
const Venue = require('../models/Venue');

const dbName = 'ein-tag-in-berlin';
mongoose.connect(`mongodb://localhost/${dbName}`);

const results = [ 
{ geoloc:4, venue: '://about blank' },
{ geoloc:4, venue: 'Griessmuehle' },
{ geoloc:4, venue: 'Griessmuehle' },
{ geoloc:4, venue: 'Else' },
{ geoloc:4, venue: 'Sage Beach Berlin' },
{ geoloc:4, venue: 'Funkhaus Berlin' },
{ geoloc:4, venue: 'Suicide Circus' },
{ geoloc:4, venue: 'Berghain' },
{ geoloc:5, venue: 'Tresor' },
{ geoloc:5, venue: 'Weekend' },
{ geoloc:5, venue: 'AVA Club' },
{ geoloc:5, venue: 'Watergate' },
{ geoloc:5, venue: 'Süss War Gestern' },
{ geoloc:5, venue: 'Club der Visionaere' },
{ geoloc:5, venue: 'Farbfernseher' },
{ geoloc:5, venue: 'Minimal Bar' },
{ geoloc:5, venue: 'Crack Bellmer' },
{ geoloc:5, venue: 'KitKatClub' },
{ geoloc:5, venue: 'Promenaden Eck' },
{ geoloc:5, venue: 'Cassiopeia' },
{ geoloc:5, venue: 'Wendel' },
{ geoloc:5, venue: 'Solar' } ]


Venue.create(results, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${results.length} events`);
//   mongoose.connection.close();
});
