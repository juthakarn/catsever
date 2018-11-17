export default (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      field: 'id',
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    surname: {
      type: DataTypes.STRING,
      field: 'surname',
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      primaryKey: false,
      autoIncrement: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      primaryKey: false,
    },
  },
    {
      freezeTableName: true,
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    });
  return User;
};
