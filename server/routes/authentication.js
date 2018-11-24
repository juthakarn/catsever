import { signup, getCurUser, getTakeToken, signin } from '../controller/authenController'
export default (app) => {
  app.get('/authentication/test/:token', getTakeToken);
  app.get('/authentication/:id', getCurUser);
  app.post('/authentication/signup', signup);
  app.post('/authentication/signin', signin);
};