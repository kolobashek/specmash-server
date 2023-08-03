import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user'

passport.use(
  new LocalStrategy(async (phone, password, done) => {
    try {
        const userExists = await User.findByPhone(phone)
        if (!userExists || userExists instanceof Error) {
            return done(null, false, { message: 'Пользователь не найден' })
        }
        if (!userExists.isActive) {
            return done(null, false, { message: 'Пользователь не активирован' })
        }
        const user = new User(phone, password)
        const isValid = await user.passwordCompare();
        if (!isValid) {
            return done(null, false, { message: 'Неверный пароль' });
        }
        if (isValid instanceof Error) {
            return done(null, false, { message: 'Проблемы с сервером' });
        }
        return done(null, user);
        } catch (error) {
            done(error);
        }
    })
);
