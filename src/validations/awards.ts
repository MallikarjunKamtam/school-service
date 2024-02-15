const Joi = require("joi");

export default Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name must not be empty",
  }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
  points: Joi.number().integer().positive().required().messages({
    "any.required": "Points is required",
    "number.base": "Points must be a number",
    "number.integer": "Points must be an integer",
    "number.positive": "Points must be a positive integer",
  }),
});
