import { User } from '../../provider/service';
import jwt from 'jsonwebtoken';
export const signup = async (req, res) => {
    const { name, surname, email, password } = req.body;
    if (name && surname && email && password) {
        const result = await User.findOne({
            where: {
                email: email
            }
        })
        if (!result) {
            User.create(req.body)
            res.send('success')
        }
        res.send('email is use already')
    }
    res.send('error')
    //console.log(name);
    //res.send({ hello: name });
};
export const getCurUser = async (req, res) => {
    const id = req.params.id;
    const result = await User.findOne({
        where: {
            id: id
        }
    })
    const token = jwt.sign({ result }, 'cat');
    res.send(token)
};
export const getTakeToken = (req, res) => {
    const { token } = req.params
    const result = jwt.verify(token, 'cat');
    res.send(result);
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const result = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })
        if (!result) {
            res.send('Not regist already?Please Signup')
        }
        const token = jwt.sign({ result }, 'cat');
        res.send(token)
    }
    res.send('We cannot found your email or password')
}