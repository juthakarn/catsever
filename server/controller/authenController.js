import jwt from 'jsonwebtoken';
import { users } from '../../models'
import { EMAIL, generateToken } from '../utils/regex';

export const signup = async (req, res) => {
  const { body } = req;
  if (body) {
    const { email, password, firstname, lastname } = body;
    if (email && password && firstname && lastname) {
      const already = await users.findOne({ where: { email: email } });
      if (already) {
        res.status(500).send({ message: "email is already use" });
      }
      const emailValidation = EMAIL.test(email);
      if (emailValidation) {
        const createUser = await users.create(body);
        const token = generateToken(createUser);
        res.status(200).send({ message: "success", token });
      }
      res.status(500).send({ message: "Email is not Provide" });
    }
    res.status(500).send({ message: "empty field" });
  }
  res.status(500).send({ message: "empty field" });
};

export const getdetail = async (req, res) => {
  const {user} = req
  console.log(user)
 res.status(200).json(user)
};

export const getTakeToken = (req, res) => {
  const { token } = req.params;
  const result = jwt.verify(token, 'cat');
  res.send(result);
};

export const signin = (req, res) => {
  const { user } = req;
  res.status(200).json({ message: "success", token: generateToken(user) });
};
