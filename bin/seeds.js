const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = 'ein-tag-in-berlin';
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [{   email: 'boss@big_company.com',
  password: String,
  role: {
    type: String,
    enum : ['Boss', 'Developer', 'TA'],
    default : 'TA'}
}]


User.create(users, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${users.length} users`)
  mongoose.connection.close()
});