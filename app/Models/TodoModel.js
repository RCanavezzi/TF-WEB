import sequelize from '../../config/sequelize.js';
import { DataTypes } from 'sequelize';

export default (function () {

    return sequelize.define(
        "TodoModel",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_checked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        },
        {
            tableName: "todos",
            timestamps: false
        }
    );



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
