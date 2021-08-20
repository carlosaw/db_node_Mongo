import { Request, Response } from 'express';

import { Product } from '../models/Product';
import  User from '../models/User';

export const home = async (req: Request, res: Response) => {
  
  //let user = await User.findOneAndUpdate();

  /*let paulo = await User.findOne({ email: 'paulo@gmail.com'});// Acha Paulo
  paulo.name.lastName = 'Strauss';// Muda nome
  paulo.age = 47;// Muda idade
  await paulo.save();// Salva no banco*/

  /*await User.updateOne(// Pega um específico
    { email: 'teste@gmail.com'},// Pega o email
    { age: 15, email: 'paulo@gmail.com'}// Troca o email
  );*/

  /*await User.updateMany(// Pega todos 
    { age:{$lte: 50} },// Pega quem tem menos ou 50 anos
    { age: 18 }// Altera para 18 anos
  );*/
  
  let users = await User.find({}).sort({"name.firstName": 1});

  res.render('pages/home', {
    users
  });
};

export const addUserAction = async (req: Request, res: Response) => {
  
  let newUser = await User.create({
    name: {firstName: req.body.firstName, lastName: req.body.lastName},
    email: req.body.email,
    age: req.body.age.toString() ? req.body.age.toString() : 18,
    interests: [req.body.interests]
  });
  
  //console.log("Novo Usuário: ", newUser);
  
  res.redirect('/');
};