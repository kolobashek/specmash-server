// class Equipment extends Model {
//   static get tableName() {
//     return 'equipment';
//   }
//   static get relationMappings() {
//     return {
//       type: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: EquipmentType,
//         join: {
//           from: 'equipment.type_id',
//           to: 'equipment_types.id'
//         }  
//       }
//     }
//   } 
// }