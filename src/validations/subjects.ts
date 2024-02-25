import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name must not be empty",
  }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
});
