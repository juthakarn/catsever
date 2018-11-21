import Sequelize from 'sequelize';
import seq from '../config/database';
import UserModel from '../model/user';

export const User = UserModel(seq, Sequelize);
