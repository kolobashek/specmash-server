import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../src/models/user.js'

passport.use(
  new LocalStrategy(
    { usernameField: 'phone' },
    async (phone, password, done) => {
      try {
        const user = await User.findOne({ phone })

        if (!user) {
          return done(null, false, { message: 'Пользователь не найден' })
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
          return done(null, false, { message: 'Неверный пароль' })
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)
