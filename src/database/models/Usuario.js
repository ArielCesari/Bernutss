module.exports = (sequelize, DataTypes) => {

    let alias = "Usuarios";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        mail: {
            type: DataTypes.STRING,
        },
        contrasenia: {
            type: DataTypes.STRING,
        },
        imagen: {
            type: DataTypes.BLOB,
        },

    };

    let config = {
        tableName: "usuarios",
        timestamps: false
    };

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;


}

