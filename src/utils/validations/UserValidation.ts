import Joi from "joi";

export const UserValidation = Joi.object({
  name: Joi.string().min(5).max(15).required().alphanum(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
});
