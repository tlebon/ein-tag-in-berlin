require('dotenv').config();
console.log(process.env.MONGODB_URI)
const mongoose = require('mongoose');
const Event = require('../models/Event');

const dbName = 'ein-tag-in-berlin';
mongoose.connect(process.env.MONGODB_URI);

const results = [
  {
    name: "Her Damit - Festival 2018",
    date2: "",
    date: "7 Sep 2018 10 Sep 2018",
    address: "Date /Fri, 7 Sep 2018  - Mon, 10 Sep 201810:00 - 08:00",
    url: "https://www.residentadvisor.net/events/1012408"
  },
  {
    name: "Griessmuehle x KHIDI w./ Rebekah, Boston 168 & Minimum Syndicat",
    date2: "",
    date: "7 Sep 2018 8 Sep 2018",
    address:
      "Date /Fri, 7 Sep 2018  - Sat, 8 Sep 201822:00 - 22:00Venue /Griessmuehle Sonnenallee 221; Neukölln; 12059 Berlin; Germany  Germany",
    url: "https://www.residentadvisor.net/events/1122579"
  }
];

Event.create(results, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${results.length} events`);
//   mongoose.connection.close();
});
