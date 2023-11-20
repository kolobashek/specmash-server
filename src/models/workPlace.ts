import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { Partner } from './partner'

export class WorkPlace extends Model {
	declare id: number
	declare name: string
	declare address: string | null
	declare comment: string | null
	declare contacts: string | null
	// static get tableName() {
	// 	return 'workPlaces'
	// }
	// static get relationMappings() {
	// 	return {
	// 		partners: {
	// 			relation: Model.ManyToManyRelation,
	// 			modelClass: Partner,
	// 			join: {
	// 				from: 'workPlaces.id',
	// 				through: {
	// 					from: 'partnersWorkPlaces.workPlaceId',
	// 					to: 'partnersWorkPlaces.partnerId',
	// 				},
	// 				to: 'partners.id',
	// 			},
	// 		},
	// 	}
	// }
	// static async getAll() {
	// 	try {
	// 		const workPlaces = await WorkPlace.query().withGraphFetched('partners')
	// 		console.log('workPlaces.getAll')
	// 		return workPlaces
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async getWorkPlaceById(id: number) {
	// 	try {
	// 		const workPlace = await this.query().findById(id).withGraphFetched('partners')
	// 		if (!workPlace) {
	// 			return new Error('WorkPlace not found')
	// 		}
	// 		return workPlace
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }

	// static async create(input: WorkPlaceAttributesInput) {
	// 	const { partners, ...workPlaceData } = input
	// 	try {
	// 		const newWorkPlace = await WorkPlace.query().insertAndFetch(workPlaceData)
	// 		if (partners) {
	// 			await newWorkPlace.$relatedQuery('partners').relate(partners)
	// 		}
	// 		return newWorkPlace
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async update(input: WorkPlaceAttributes) {
	// 	try {
	// 		const { partners, ...workPlaceData } = input
	// 		const workPlace = await WorkPlace.query().findById(workPlaceData.id)
	// 		if (!workPlace) {
	// 			return new Error('WorkPlace not found')
	// 		}
	// 		const updatedWorkPlace = await workPlace.$query().patchAndFetch({
	// 			...workPlaceData,
	// 		})
	// 		if (partners) {
	// 			await workPlace.$relatedQuery('partners').relate(partners)
	// 		}
	// 		// const updatedWorkPlace = await WorkPlace.query().upsertGraph(graphData)
	// 		return updatedWorkPlace
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
}
WorkPlace.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		contacts: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		modelName: 'workPlaces',
		sequelize,
		paranoid: true,
	}
)

export interface WorkPlaceAttributes extends WorkPlaceAttributesInput {
	id: number
}
export interface WorkPlaceAttributesInput {
	name: string
	contacts?: string
	address?: string
	partners?: number[]

	// [key: string]: string | undefined | number | number[]
}
