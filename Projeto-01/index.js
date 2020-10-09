const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const usuarios = require("./models/usuarios")
const contacts = require("./models/contact")

//template engine
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")


//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/assets", express.static('assets'));

//Rotas
app.get("/", function(req, res){
	res.render("home");
})

app.get("/contato", function(req, res){
	res.render("contact");
})

app.get("/quem_somos", function(req, res){
	res.render("quem_somos");
})

app.post("/formContact", function(req, res){
	contacts.create({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		message: req.body.message
	}).then(function(){
		res.send("<script>setTimeout(function() {window.location.href = '/';}, 100);</script>")
	}).catch(function(erro){
		res.send("Não foi possivel criar o contato, erro: " + erro)
	})
})

app.get("/contatos", function(req, res){
	contacts.findAll({order: [["id", "ASC"]]}).then(function(contacts){
		res.render("contacts", {contacts: contacts})
	})
})

app.get("/contato/:id", function(req, res){
	contacts.findOne({where: {"id": req.params.id}}).then((contact) =>{
		res.render("contact_info", {contact: contact})
	})
})

app.post("/alteracao", function(req, res){
	contacts.findOne({where: {"id": req.body.id}}).then(function(contact){
		
		contact.name = req.body.name
		contact.email = req.body.email
		contact.phone = req.body.phone
		contact.message = req.body.message

		contact.save().then(() => {
			res.send("<script>setTimeout(function() {window.location.href = '/contatos';}, 100);</script>");
		})

	})
})

app.get("/delete/:id", function(req, res){
	contacts.destroy({where: {"id": req.params.id}}).then(function(){
		res.send("<script>alert('Contato removido com sucesso');setTimeout(function() {window.location.href = '/contatos';}, 100);</script>")
	}).catch(function(erro){
		res.send("<script>alert('Erro: " + erro + ");setTimeout(function() {window.location.href = '/contatos';}, 100);</script>")
	})
})

app.listen(8081, function(){
	console.log("Servidor está rodando na url localhost:8081")
})