const User = require('./User');
const Location = require('./Location');
const Review = require('./Review');

User.hasMany(Location, {
  foreignKey: 'user_id'
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Location.hasMany(Review, {
  foreignKey: 'location_id'
})

Location.belongsTo(User, {
  foreignKey: 'user_id'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Review.belongsTo(Location, {
  foreignKey: 'location_id'
})

module.exports = { User, Location, Review };



