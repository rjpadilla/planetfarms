const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.js'))[env]

// const db = {};

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//     db[model.name] = sequelize.model
//   })

const db = {
  User: require('./userModel')(sequelize, Sequelize.DataTypes),
  Community: require('./communityModel')(sequelize, Sequelize.DataTypes),
  CommunityUser: require('./communityUserModel')(sequelize, Sequelize.DataTypes),
  Group: require('./communityGroupModel')(sequelize, Sequelize.DataTypes),
  Enterprise: require('./enterprisesModel')(sequelize, Sequelize.DataTypes),
  News: require('./newsModel')(sequelize, Sequelize.DataTypes),
  GroupUser: require('./groupUserModel')(sequelize, Sequelize.DataTypes),
  EnterpriseUser: require('./enterpriseUserModel')(sequelize, Sequelize.DataTypes),
  LocalAuth: require('./localAuthModel')(sequelize, Sequelize.DataTypes),
  Courses: require('./courseModel')(sequelize, Sequelize.DataTypes),
  Lesson: require('./lessonModel')(sequelize, Sequelize.DataTypes),
  Video: require('./videoModel')(sequelize, Sequelize.DataTypes),
  Text: require('./textModel')(sequelize, Sequelize.DataTypes),
  Photo: require('./photoModel')(sequelize, Sequelize.DataTypes),
  Material: require('./materialModel')(sequelize, Sequelize.DataTypes),
  Test: require('./testModel')(sequelize, Sequelize.DataTypes),
  Question: require('./questionModel')(sequelize, Sequelize.DataTypes)
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
