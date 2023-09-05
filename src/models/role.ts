import { Model } from 'objection'

class Role extends Model {
	constructor(name: string, id: number) {
		super()
		this.name = name
		this.id = id
	}
	id
	name
	static get tableName() {
		return 'roles'
	}
	static getRoleById = async (id: number) => {
		try {
			const role = await this.query().findById(id)
			return role
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static getByName = async (name: string) => {
		try {
			const role = await this.query().select('name').where({ name }).first()
			if (role) {
				return role
			}
			return new Role('UNDEFINED', 4)
		} catch (error) {
			return Promise.reject(error)
		}
	}
	static getAll = async () => {
		const allRoles = await this.query().select('name')
		return allRoles.map((role) => role.name)
	}
	static get jsonSchema() {
		return {
			type: 'string',
			enum: ['admin', 'manager', 'driver', 'UNDEFINED'],
			default: 'driver',
		}
	}
}
export default Role
