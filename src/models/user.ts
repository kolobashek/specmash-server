// import { Model } from 'objection'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { knex } from '../db'
import { Role } from './role'
import logger from '../config/logger'
import { sequelize } from '../db'
import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize'

const signingKey = process.env.JWT_SECRET || 'secret'

// class User extends Model implements User {
// 	constructor(
// 		phone?: string,
// 		password?: string,
// 		id?: number,
// 		name?: string,
// 		nickname?: string,
// 		role?: string,
// 		isActive?: boolean,
// 		comment?: string
// 	) {
// 		super()
// 		this.id = id ?? 0
// 		// this.hash = hash ?? ''
// 		this.password = password ?? ''
// 		this.name = name ?? ''
// 		this.nickname = nickname ?? ''
// 		this.phone = phone ?? ''
// 		this.role = role ?? ''
// 		this.isActive = isActive ?? false
// 		this.comment = comment ?? ''
// 	}
// 	static async create(data: any) {
// 		try {
// 			const { password, phone, ...userData } = data
// 			// Добавление умолчаний
// 			userData.roleId = 3
// 			userData.isActive = false
// 			const isUserExists = await this.findByPhone(phone)
// 			if (isUserExists) {
// 				return Promise.reject(new Error('Пользователь с таким номером уже есть'))
// 			}
// 			const hashedPassword = await hash(password, 10)
// 			const newUser = await this.query().insert({
// 				...userData,
// 				phone,
// 				password: hashedPassword,
// 			})
// 			return newUser
// 		} catch (error: any) {
// 			logger.error(error)
// 			throw new Error(error)
// 		}
// 	}
// 	static async update({
// 		id,
// 		name,
// 		nickname,
// 		phone,
// 		password,
// 		role,
// 		isActive,
// 		comment,
// 	}: UpdateUserInput) {
// 		let userData: UserDbInput = {
// 			name,
// 			nickname,
// 			phone,
// 			isActive,
// 			comment,
// 			password,
// 			role,
// 		}

// 		if (password) {
// 			const hashedPassword = await hash(password, 10)
// 			userData.password = hashedPassword
// 		}
// 		console.log(userData)
// 		const rowResult = await this.query().update(userData).where({ id })
// 		if (rowResult > 0) {
// 			const newUser = await User.getUserById(id)
// 			return newUser
// 		}
// 		return new Error('Пользователь не обновлен')
// 	}

// 	static async login(phone: any, password: any) {
// 		const user = await User.getUserByPhone(phone, password)
// 		if (user instanceof Error) {
// 			return user
// 		}
// 		const { ...payload } = user
// 		// console.log('payload', payload)
// 		const token = await (jwt as any).sign(payload, signingKey, {
// 			subject: payload.id.toString(),
// 			expiresIn: '1d',
// 		})
// 		return token
// 	}
// 	static async getAll({ input }: IUserFilter = { input: {} }) {
// 		try {
// 			// console.log('userModel ', input)
// 			const { limit, offset, role, ...filter } = input
// 			const users = await User.query()
// 				.join('roles', 'users.roleId', 'roles.id')
// 				.select('users.*', 'roles.name as role')
// 				.where(filter)
// 				.where(role ? { 'roles.name': role } : {})
// 				.limit(limit || 100)
// 				.offset(offset || 0)
// 			return users
// 		} catch (error: any) {
// 			return new Error(error)
// 		}
// 	}
// 	static async getUserByHash(token: string) {
// 		const hash = token.split(' ')[1]
// 		const payload = jwt.verify(hash, signingKey)
// 		if (typeof payload === 'string') {
// 			return new Error(`${payload}`)
// 		}
// 		const user = await User.getUserById(payload.id)
// 		return user
// 	}
// 	async getHashByPhone() {
// 		try {
// 			const user = await User.findByPhone(this.phone)
// 			if (!user || user instanceof Error) {
// 				throw new Error('Пользователь не найден')
// 			}
// 			// this.hash = user.hash
// 		} catch (error: any) {
// 			return new Error(error)
// 		}
// 	}
// 	static roleToString = (user: User) => {}

// 	async passwordCompare(hash: string) {
// 		try {
// 			const user = await User.query().where({ id: this.id }).first()
// 			if (!user) {
// 				return new Error('Пользователь не найден')
// 			}
// 			return await compare(hash, user.password)
// 		} catch (error: any) {
// 			return new Error(error)
// 		}
// 	}

// 	static async isActive(userId: Number): Promise<boolean> {
// 		const { isActive } = await knex.select('isActive').from('users').where('id', userId).first()
// 		return isActive
// 	}

// 	static async getUserByPhone(phone: string, password: string): Promise<User | Error> {
// 		try {
// 			const user = await User.query()
// 				.join('roles', 'users.roleId', 'roles.id')
// 				.select('users.*', 'roles.name as role')
// 				.where({ phone })
// 				.first()
// 			if (!user) {
// 				return new Error('Пользователь не найден')
// 			}
// 			const isValid = await compare(password, user.password)
// 			if (!isValid) {
// 				return new Error('Неверный пароль')
// 			}
// 			return user
// 		} catch (error: any) {
// 			return error
// 		}
// 	}

// 	static async getUserById(id: Number) {
// 		try {
// 			const user = await User.query()
// 				.join('roles', 'users.roleId', 'roles.id')
// 				.select('users.*', 'roles.name as role')
// 				.where({ 'users.id': id })
// 				.first()
// 			// console.log('getUserById', user)
// 			if (!user) {
// 				return new Error('Пользователь не найден')
// 			}
// 			return user
// 		} catch (error: any) {
// 			return new Error(error)
// 		}
// 	}

// 	static async findByPhone(phone: string) {
// 		try {
// 			const user = await this.query().where({ phone }).first()
// 			if (!user) {
// 				return null
// 			}
// 			return user
// 		} catch (error: any) {
// 			return new Error(error)
// 		}
// 	}
// 	public async save(): Promise<User> {
// 		return User.query().updateAndFetchById(this.id, this)
// 	}

// 	static async toggleUserActive(userId: number) {
// 		const user = await this.query().findById(userId)
// 		if (user) {
// 			user.isActive = !user.isActive
// 			await user.save()
// 			return user.isActive
// 		}
// 		return new Error('Пользователь не найден')
// 	}

// 	static get tableName() {
// 		return 'users'
// 	}

// 	static get idColumn() {
// 		return 'id'
// 	}

// 	static get jsonSchema() {
// 		return {
// 			type: 'object',
// 			required: ['name', 'phone', 'role'],

// 			properties: {
// 				id: { type: 'integer' },
// 				name: { type: 'string', minLength: 1, maxLength: 255 },
// 				nickname: { type: 'string', maxLength: 255 },
// 				phone: { type: 'string', minLength: 3, maxLength: 25 },
// 				role: { type: 'string', minLength: 1, maxLength: 30 },
// 				password: { type: 'string', minLength: 1, maxLength: 255 },
// 				isActive: { type: 'boolean' },
// 				comment: { type: 'string', maxLength: 255 },
// 			},
// 		}
// 	}

// 	static get relationMappings() {
// 		return {
// 			role: {
// 				relation: Model.BelongsToOneRelation,
// 				modelClass: Role,
// 				join: {
// 					from: 'users.roleId',
// 					to: 'roles.id',
// 				},
// 			},
// 		}
// 	}
// }
// export default User
export class User extends Model {
	declare id: number
	declare name: string
	declare nickname: string | null
	declare phone: string
	declare password: string
	declare role: string
	declare comment: string | null
	static async checkAuthByToken(token: string) {
		const hash = token.split(' ')[1]
		const payload = jwt.verify(hash, signingKey)
		if (typeof payload === 'string') {
			logger.error(payload)
			return null
		}
		const user = await User.findByPk(payload.id)
		if (user === null) {
			logger.error('Пользователь не найден')
		}
		return user
	}
	static async login(payload: LoginInput) {
		const user = await User.findOne({ where: { phone: payload.phone } })
		if (!user) {
			return new Error('Пользователь не найден')
		}
		const isValid = await compare(payload.password, user.password)
		if (!isValid) {
			return new Error('Неверный пароль')
		}
		const token = jwt.sign({ id: user.id }, signingKey, {
			subject: payload.phone,
			expiresIn: '1d',
		})
		return token
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		nickname: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		phone: {
			type: DataTypes.STRING(25),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			set(value: string) {
				// Storing passwords in plaintext in the database is terrible.
				// Hashing the value with an appropriate cryptographic hash function is better.
				this.setDataValue('password', hash(value, 10))
			},
		},
		role: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		comment: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		tokenEncrypt: {
			type: DataTypes.VIRTUAL,
			async set(token: string) {},
		},
		// createdAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// },
		// updatedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: false,
		// },
		// deletedAt: {
		// 	type: DataTypes.DATE,
		// 	allowNull: true,
		// },
	},
	{
		tableName: 'users',
		sequelize,
		paranoid: true,
	}
)

export interface IUser extends IUserInput {
	id: number
}
export interface IUserInput extends LoginInput {
	name: string
	nickname?: string
	role: string
	comment?: string
}

// interface UserDbInput {
// 	name?: string
// 	nickname?: string
// 	phone?: string
// 	isActive?: boolean
// 	comment?: string
// 	password?: string
// 	role: string
// }
// export interface UpdateUserInput extends Partial<IUserInput> {
// 	id: number
// }
export interface UserIdInput {
	input: {
		userId: number
	}
}

export interface LoginInput {
	phone: string
	password: string
}
export interface IUserFilter {
	input: IFilter
}
interface IFilter extends Partial<IUser> {
	limit?: number
	offset?: number
}
