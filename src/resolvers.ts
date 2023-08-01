import Role from './models/role';
import User from './models/user'
import bcrypt from 'bcrypt'

const resolvers = {
  Query: {
    users: async () => {
      // получить пользователей из БД
      // const users = await db.query('SELECT * FROM users')
      // return users
      const users = await User.query()
      return users
    },

    roles: async () => {
      // получить роли из БД
      const roles = await Role.query()
      return roles
    },

    equipment: async () => {
      // получить оборудование из БД
    },

    objects: async () => {
      // получить объекты из БД
    },

    travelLogs: async () => {
      // получить путевые листы из БД
    },

    findByPhone: async (_: any, { phone }: { phone: string }) => {
      const user = await User.query().where({ phone }).first()
      return user
    },
    createUser: async (_: any, { data }: { data: CreateUserInput }) => {
      // хэширование пароля  
      console.log(data)
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Добавление роли по умолчанию  
      data.roleId = 3;

      // Регистрация пользователя с хэшированным паролем и ролью по умолчанию
      const user = await User.query().insert({
        ...data,
        password: hashedPassword
      });
      console.log(user)
      return user
    },
  },
}

export default resolvers

type CreateUserInput = {
  name: string
  password: string
  phone: string
  roleId?: number
}
