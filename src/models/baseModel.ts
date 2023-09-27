import path from 'path'
import { Model } from 'objection'

const __dirname = path.dirname(import.meta.url)
// models/BaseModel.js
export class BaseModel extends Model {
	static get modelPaths() {
		return [__dirname]
	}
}
