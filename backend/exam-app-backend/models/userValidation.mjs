import joi from 'joi';

export const userValidationSchema = joi.object({
  id: joi.string().required(),
  firstname: joi.string().min(2).max(50).required(),
  lastname: joi.string().min(2).max(50).required(),
  nickname: joi.string().min(2).max(30).optional(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  createdAt: joi.date().iso().default(() => new Date().toISOString()),
});

export const validateUser = (user) => {
  return userValidationSchema.validate(user);
};
