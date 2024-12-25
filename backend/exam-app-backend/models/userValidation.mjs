import joi from 'joi';

export const userValidationSchema = joi.object({
  id: joi.string().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  createdAt: joi.date().iso().default(() => new Date().toISOString()),
});

// Funktion för validering
export const validateUser = (user) => {
  return userValidationSchema.validate(user);
};
