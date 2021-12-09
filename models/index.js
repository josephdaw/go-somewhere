const User = require('./User');
const Location = require('./Location');

User.hasMany(Location, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Location.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Location };






// const User = require('./User');
// const Project = require('./Project');

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// module.exports = { User, Project };
