import Mutations from './mutations.graphql'
import Queries from './queries.graphql'
import Schemas from './schemas.graphql.ts'
import Inputs from './inputs.graphql'
import adminQueries from './admin.queries.graphql.ts'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { GraphQLError, GraphQLSchema, defaultFieldResolver } from 'graphql'
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import resolvers from '../resolvers/index.ts'

const types = [Schemas, Mutations, Queries, adminQueries, Inputs]
const typeDefs = mergeTypeDefs(types)

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// export default schema
// const signingKey = process.env.JWT_SECRET || 'secret'

// function authDirective(
// 	directiveName: string,
// 	getUserFn: (token: string) => { hasRole: (role: string) => boolean }
// ) {
// 	const typeDirectiveArgumentMaps: Record<string, any> = {}
// 	return {
// 		authDirectiveTypeDefs: `directive @${directiveName}(
//       role: Role = admin,
//     ) on OBJECT | FIELD_DEFINITION | QUERY
//     `,
// 		authDirectiveTransformer: (schema: GraphQLSchema) =>
// 			mapSchema(schema, {
// 				[MapperKind.TYPE]: (type) => {
// 					const authDirective = getDirective(schema, type, directiveName)?.[0]
// 					if (authDirective) {
// 						typeDirectiveArgumentMaps[type.name] = authDirective
// 					}
// 					return undefined
// 				},
// 				[MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
// 					const authDirective =
// 						getDirective(schema, fieldConfig, directiveName)?.[0] ??
// 						typeDirectiveArgumentMaps[typeName]
// 					if (authDirective) {
// 						const { role } = authDirective
// 						if (role) {
// 							const { resolve = defaultFieldResolver } = fieldConfig
// 							fieldConfig.resolve = function (source, args, context, info) {
// 								const user = getUserFn(context.headers.authToken)
// 								if (!user.hasRole(role)) {
// 									throw new Error('not authorized')
// 								}
// 								return resolve(source, args, context, info)
// 							}
// 							return fieldConfig
// 						}
// 					}
// 				},
// 				[MapperKind.QUERY]: (queryConfig, queryName) => {
// 					const authDirective = getDirective(schema, queryConfig, directiveName)?.[0]

// 					if (authDirective) {
// 						// добавляем проверку авторизации для запроса
// 						// console.log('authDirective', queryConfig, directiveName)
// 					}

// 					return queryConfig
// 				},
// 			}),
// 	}
// }

// // function getUser(token: string) {
// // 	console.log('token', token)
// // 	const roles = ['driver', 'manager', 'admin']
// // 	return {
// // 		hasRole: (role: string) => {
// // 			const tokenIndex = roles.indexOf(token)
// // 			const roleIndex = roles.indexOf(role)
// // 			return roleIndex >= 0 && tokenIndex >= roleIndex
// // 		},
// // 	}
// // }

// const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth', getUser)

let schema = makeExecutableSchema({
	typeDefs: [typeDefs],
	resolvers,
})

export default schema
