const db = require("./../db")

const contacts = db.sequelize.define("contacts", {
	name: {
		type: db.Sequelize.STRING
	},
	email: {
		type: db.Sequelize.STRING
    },
    phone: {
        type: db.Sequelize.STRING
    },
    message: {
        type: db.Sequelize.TEXT
    }
})

// contacts.sync({force: true})

module.exports = contacts