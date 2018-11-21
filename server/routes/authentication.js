import { User } from '../../provider/service';

export default (app, route) => {
  app.get('/', (req, res) => {
    console.log(User);
    res.send('helloworld');
  });

  app.post('/authentication/signup', (req, res) => {
    const { name, surname, email, password } = req.body;
    if (name && surname && email && password) {
      User.findOne({
        where: {
          email: email
        }
      }).then(result => {
        if (!result) {
          User.create(req.body)
          res.send('success')
        }
        res.send('email is use already')
      })
    }
    res.send('error')
    console.log(name);
    res.send({ hello: name });
  });
};
