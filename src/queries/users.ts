import db from '../db'

export async function getAllUsers() {
  return await db.from('users').select('*');
}
