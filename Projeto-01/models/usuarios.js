const db = require("./db")

const usuarios = db.sequelize.define("usuarios", {
	firstname: {
		type: db.Sequelize.STRING
	},
	lastname: {
		type: db.Sequelize.STRING
	}
})

// usuarios.sync({force: true})

module.exports = usuarios