import Sequelize from "sequelize"

export class Module extends Sequelize.Model {
	
	static associate(db) {
		Module.hasMany(db.Menu, {
			as: "Menu",
			foreignKey: "module_id"
		})
	}

	static initScopes(db ) { 
		Module.addScope("withMenus", {
			include: [
				{
					model: db.Menu,
					as: "Menu",
					required: false,
					include: []
				}
			]
		})
	}

}

export const initModel = (sequelize, DataTypes) => {
	Module.init({
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updated_at: {
			allowNull: false,
			type: DataTypes.DATE
		}
	}, {
		tableName: "modules",
		sequelize: sequelize,
        underscored: true,
        modelName: "Module",
        createdAt: "created_at",
        updatedAt: "updated_at"
	})
}

export default Module
