import jwt from 'jsonwebtoken';
import { users, appointment } from '../../models'
import moment from 'moment-timezone'
import { Op } from 'sequelize'
import { EMAIL, generateToken, degenerateToken } from '../utils/regex';

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
};
export const getUser = async (req,res)=>{
  const { authorization } = req.headers
  const { sub } = degenerateToken(authorization)
  const user =  await users.findOne({where:{id:sub}})
  res.send({message:'success',user:user})
}
export const getdetail = async (req, res) => {
  const { user } = req
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

export const AddAppointment = async (req, res) => {
  const { authorization } = req.headers
  const { sub } = degenerateToken(authorization)
  const { dateValue, hospital, detail } = req.body
  const payload = {
    userid: sub,
    date: dateValue,
    hospital,
    detail
  }
  await appointment.create(payload)
  const appointmentList = await appointment.findAll({
    where: {
      userid: sub, date: {
        [Op.gt]: moment().tz('Asia/Bangkok').startOf('days')
      }
    }
  })
  res.send(appointmentList)
}

export const getAllAppointment = async (req, res) => {
  const { authorization } = req.headers
  const { sub } = degenerateToken(authorization)
  console.log(moment().tz('Asia/Bangkok').startOf('days'))
  const appointmentList = await appointment.findAll({
    where: {
      userid: sub, date: {
        [Op.gt]: moment().tz('Asia/Bangkok').startOf('days')
      }
    }
  })
  res.send(appointmentList)
}