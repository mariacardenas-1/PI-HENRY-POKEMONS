const { DataTypes } =require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pokemontype', {
        pokemonTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        pokemonId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull:false,
        }
    });
}