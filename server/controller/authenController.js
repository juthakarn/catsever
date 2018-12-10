import jwt from 'jsonwebtoken';
import { User } from '../../provider/service';

export const signup = async (req, res) => {
  const {
    name, surname, email, password,
  } = req.body;
  if (name && surname && email && password) {
    const result = await User.findOne({
      where: {
        email,
      },
    });
    if (!result) {
      User.create(req.body);
      const response = await User.findOne({
        where: {
          email,
          password,
        },
      });
      const token = jwt.sign({ response }, 'cat');
      res.send(token);
    }
    res.send('email is use already');
  }

  // console.log(name);
  // res.send({ hello: name });
};
export const getCurUser = async (req, res) => {
  const id = req.params.id;
  const result = await User.findOne({
    where: {
      id,
    },
  });
  const token = jwt.sign({ result }, 'cat');
  res.send(token);
};
export const getTakeToken = (req, res) => {
  const { token } = req.params;
  const result = jwt.verify(token, 'cat');
  res.send(result);
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const result = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (!result) {
      console.log('res', result);
      res.send('Not regist already?Please Signup');
    }
    const token = jwt.sign({ result }, 'cat');
    console.log('tt', token);
    res.send(token);
  }
  res.send('We cannot found your email or password');
};
