import { User } from '../../provider/service';
import jwt from 'jsonwebtoken';
export default (app, route) => {
  app.get('/authentication/test/:token', (req, res) => {
    const {token} = req.params
    const result = jwt.verify(token, 'cat');
    res.send(result);
  });
  app.get('/authentication/:id', async (req, res) => {
    const id = req.params.id;
    const result = await User.findOne({
      where: {
        id: id
      }
    })
    const token = jwt.sign({result}, 'cat');
    res.send(token)
  });

  app.post('/authentication/signup', async (req, res) => {
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
  });
};
