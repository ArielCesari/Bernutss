/* -----PASOS------ */
// Guardar al usuario en la DB (Archivo JSON) => ***** create *****
// Buscar al usuario que se quiere loguear por su ID  => ***** findByPk *****
// Buscar al usuario que se quiere loguear por su email =>*****  findByField ***** (campo)
// Editar la información de un usuario
// Eliminar un usuario de la DB => *****  delete ***** 

// Para esto, creamos un Objeto literal con metodos, los cuales se van a encargar de estas caracteristicas

// Requerimos fs
const fs = require("fs");

const Users = {
    //Referenciamos el archivo(JSON) de la base de datos
    filename: "./src/data/users.json",
    //Traemos todos los usuarios para trabajar.
    getData: function () {
        return JSON.parse(fs.readFileSync(this.filename, "utf-8"));


    },
    // Generar un ID
    generateID: function () {
        /* Primero debemos obtener todos los usuarios  */
        let allUsers = this.findAll();
        /* Traer el ultimo usuario del array */
        let lastUser = allUsers.pop();
        if (lastUser) {
            /* Devolver el id del ultimo usuario + 1. Si es que hay usuarios en el array*/
            return lastUser.id + 1;

        } else {
            return 1;
        }

    },
    // Obtener todos los usuarios, muy similar a getData
    findAll: function () {
        return this.getData();

    },
    //Buscar un usuario por ID
    findByPk: function (id) {
        /* Primero debemos obtener todos los usuarios  */
        let allUsers = this.findAll();
        /* Usuario por id */
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },
    //Buscar usuario por email o campo.
    findByField: function (field, text) {
        /* Primero debemos obtener todos los usuarios  */
        let allUsers = this.findAll();
        /* Usuario por id */
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    // Guardar al usuario en la base de datos
    create: function (userData) {
        /* Primero debemos obtener todos los usuarios  */
        let allUsers = this.findAll();
        /* Nuevo usuario */
        let newUser = {
            id: this.generateID(),
            ...userData
        }
        /* Agregamos el usuario en la base de datos */
        allUsers.push(newUser)
        /* Escribimos y  lo transformamos en JSON */
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, " "));
        return true

    },
    delete: function (id) {
        /* Primero debemos obtener todos los usuarios  */
        let allUsers = this.findAll();
        /* Devolver todos los usuarios menos el usuario que corresponde con el id que pasamos */
        let finalUser = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.filename, JSON.stringify(finalUser, null, " "));
        return true
    }
}

module.exports =  Users;