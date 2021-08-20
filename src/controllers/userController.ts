import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

export const nome = (req: Request, res: Response) => {
  let nome: string = req.query.nome as string;
  let idade: string = req.query.idade as string;

  res.render('pages/nome', {
    nome,
    idade
  });
};

export const idadeForm = (req: Request, res: Response) => {
  res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
  let mostrarIdade: boolean = false;
  let idade: number = 0;

  if (req.body.ano) {
    let anoNascimento: number = parseInt(req.body.ano as string);
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - anoNascimento;
    mostrarIdade = true;
  }

  res.render('pages/idade', {
    idade,
    mostrarIdade
  });
};
export const incrementAgeAction = async (req: Request, res: Response) => {
  //console.log("PARAMS: ", req.params);  
  let _id: string = req.params._id;
  let results = await User.find({_id});
  if(results.length > 0) {
    let usuario = results[0];
    usuario.age++;
    await usuario.save();
  } else {
    console.log("NÃO ACHOU!");
  }
  res.redirect('/');
};
export const decrementAgeAction = async (req: Request, res: Response) => {
  //console.log("PARAMS: ", req.params);  
  let _id: string = req.params._id;
  let results = await User.find({_id});
  if(results.length > 0) {
    let usuario = results[0];
    usuario.age--;
    await usuario.save();
  } else {
    console.log("NÃO ACHOU!");
  }
  res.redirect('/');
};
export const excluir = async (req: Request, res: Response) => {
  //console.log("PARAMS: ", req.params);  
  let _id: string = req.params._id;
  let resultDel = await User.deleteOne({_id});
  
  res.redirect('/');
};