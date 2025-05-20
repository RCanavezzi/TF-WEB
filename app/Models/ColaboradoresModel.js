import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "Colaboradores",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cargo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pode_desenvolver: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },
        {
            tableName: "colaboradores",
            timestamps: false
        }
    );

    // id SERIAL PRIMARY KEY,
    // nome VARCHAR(155),
    // cargo VARCHAR(155),
    // pode_desenvolver BOOLEAN DEFAULT FALSE



    // Campos:
    // type: DataTypes.INTEGER, DataTypes.STRING, DataTypes.BOOLEAN, ...
    // primaryKey: boolean
    // autoIncrement: boolean
    // allowNull: boolean
    // defaultValue: boolean

    // Opcoes
    // tableName: ""
    // timestamps: false    



})();