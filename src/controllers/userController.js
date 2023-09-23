const { validationResult } = require("express-validator");

const bcryptjs = require("bcryptjs");
const Users = require("../models/User")

const userController = {

    register: (req, res) => {
        res.render("register");
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        const userInDb = Users.findByField("email", req.body.email)
        if (userInDb) {
            return res.render("register", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body
            })
        }
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename

        }
        Users.create(userToCreate)
        return res.redirect("/users/login")




    },
    login: (req, res) => {

        
        return res.render("login");

    },

    loginProcess: (req, res) => {

        let userToLogin = Users.findByField("email", req.body.email);
        if (userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                delete userToLogin.password;
             req.session.userLogged = userToLogin;
                return res.redirect("/users/profile")
            } 
            return res.render("login", {
                errors: {
                    email: {
                        msg: "Las credenciales son inválidas"
                    }
                }
            })

        }

        return res.render("login", {
            errors: {
                email: {
                    msg: "No se encuentra este email en nuestra base de datos"
                }
            }
        })


    },



    profile: (req, res) => {
        
        res.render("userProfile", {
            user: req.session.userLogged
           
        } )
     
      
    }

}





module.exports = userController;

