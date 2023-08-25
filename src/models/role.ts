import { Model } from 'objection'

class Role extends Model {
	static get tableName() {
		return 'roles'
	}
	static getRoleById = async (id: number) => {
		try {
			const role = await this.query().findById(id)
			console.log('role', role)
			return role
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static getAll = async () => {
		const allRoles = await this.query().select('name')
		return allRoles
	}
	static get jsonSchema() {
		return {
			type: 'string',
			enum: ['admin', 'manager', 'driver'],
			default: 'driver',
		}
	}
}
export default Role
