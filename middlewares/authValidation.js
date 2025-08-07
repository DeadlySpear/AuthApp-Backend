const joi = require('joi');

const signupValidation = (req,res,next)=>{
  const Schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().max(30).required().min(4),
  });
  const {error} = Schema.validate(req.body);
  if(error){
    return res.status(400).send(error.details[0]);
  }
  next();
}

const loginValidation = (req,res,next)=>{
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().max(30).required(),
  });
  const {error} = Schema.validate(req.body);
  if(error){
    return res.status(400).send("internal server error");
  }
  next();
}
module.exports={
  signupValidation,
  loginValidation
}