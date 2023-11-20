import { WorkPlace } from './workPlace'
import {
	BelongsToManyGetAssociationsMixin,
	BelongsToManySetAssociationsMixin,
	DataTypes,
	Model,
} from 'sequelize'
import { sequelize } from '../db'

export class Partner extends Model {
	declare id: number
	declare name: string
	declare address: string | null
	declare comment: string | null
	declare contacts: string | null
	declare getWorkPlaces: BelongsToManyGetAssociationsMixin<WorkPlace>
	declare setWorkPlaces: BelongsToManySetAssociationsMixin<WorkPlace, number>
	declare addWorkPlace: BelongsToManySetAssociationsMixin<WorkPlace, number>

	// static get tableName() {
	// 	return 'partners'
	// }
	// static get relationMappings() {
	// 	return {
	// 		workPlaces: {
	// 			relation: Model.ManyToManyRelation,
	// 			modelClass: WorkPlace,
	// 			join: {
	// 				from: 'partners.id',
	// 				through: {
	// 					from: 'partnersWorkPlaces.partnerId',
	// 					to: 'partnersWorkPlaces.workPlaceId',
	// 				},
	// 				to: 'workPlaces.id',
	// 			},
	// 		},
	// 	}
	// }
	// static async getAll() {
	// 	try {
	// 		const partners = await Partner.query().withGraphFetched('workPlaces')
	// 		return partners
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async getPartnerById(id: number) {
	// 	try {
	// 		const partner = await this.query().findById(id).withGraphFetched('workPlaces')
	// 		if (!partner) {
	// 			return new Error('Partner not found')
	// 		}
	// 		return partner
	// 	} catch (error) {
	// 		return Promise.reject(error)
	// 	}
	// }
	// static async create(input: PartnerAttributesInput) {
	// 	const { workPlace, ...partnerData } = input
	// 	try {
	// 		const newPartner = await Partner.query().insert(partnerData)
	// 		if (workPlace) {
	// 			await newPartner.$relatedQuery('workPlaces').relate(workPlace)
	// 		}
	// 		return newPartner
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
	// static async update(input: PartnerAttributes) {
	// 	const { workPlaces, ...partnerData } = input
	// 	try {
	// 		const partner = await Partner.query().findById(partnerData.id)
	// 		if (!partner) {
	// 			return new Error('Partner not found')
	// 		}
	// 		const updatedPartner = await Partner.query().patchAndFetch({
	// 			...partnerData,
	// 		})
	// 		if (workPlaces) {
	// 			await partner.$relatedQuery('workPlaces').relate(workPlaces)
	// 		}
	// 		return updatedPartner
	// 	} catch (error) {
	// 		return new Error(error as string)
	// 	}
	// }
}

Partner.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contacts: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		// workPlaces: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// 	references: {
		// 		model: WorkPlace,
		// 		key: 'id',
		// 	},
		// },
	},
	{
		modelName: 'partners',
		sequelize,
		paranoid: true,
	}
)
Partner.beforeCreate(async (partner) => {
	const partnerExists = await Partner.findOne({ where: { name: partner.name } })
	if (partnerExists) {
		throw new Error('Контрагент с таким названием уже зарегистрирован')
	}
})
Partner.belongsToMany(WorkPlace, { through: 'PartnerWorkPlace', as: 'workPlaces' })
WorkPlace.belongsToMany(Partner, { through: 'PartnerWorkPlace', as: 'partners' })

export interface PartnerAttributes extends PartnerAttributesInput {
	id: number
}
export interface PartnerAttributesInput {
	name: string
	contacts?: string
	address?: string
	workPlaces?: IWorkPlace[]

	[key: string]: string | undefined | number | IWorkPlace[]
}

interface IWorkPlace {
	id: number
	name: string
}
