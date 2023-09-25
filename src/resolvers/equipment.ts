import { GraphQLError } from 'graphql'
import { resolverPermissions } from '.'
import Equipment, { EquipmentAttributesInput, UpdateEquipmentInput } from '../models/equipment'
import EquipmentType from '../models/equipmentType'

export const EquipmentResolver = {
	Query: {
		getEquipmentTypes: async () => {
			const types = await EquipmentType.getAll()
			return types
		},
		equipments: async () => {
			const equipments = await Equipment.getAll()
			return equipments
		},
		equipment: async (parent: any, { id }: { id: number }, ctx: any) => {
			const equipment = await Equipment.getEquipmentById(id)
			return equipment
		},
	},
	Mutation: {
		createEquipment: async (
			parent: any,
			{ input }: { input: EquipmentAttributesInput },
			ctx: any
		) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				console.log('input', input)
				const newEquipment = await Equipment.create(input)
				return newEquipment
			}
			return new GraphQLError('Недостаточные права доступа')
		},
		updateEquipment: async (parent: any, { input }: { input: UpdateEquipmentInput }, ctx: any) => {
			const userHasPermissions = await resolverPermissions(ctx, 'admin', 'manager')
			if (userHasPermissions) {
				const user = await Equipment.update(input)
				console.log(user)
				return user
			}
			return new GraphQLError('Недостаточно прав')
		},
	},
}
