const Joi = require('joi');

export  default Joi.object({
    first_name: Joi.string().required().messages({
      'any.required': 'First name is required',
      'string.empty': 'First name must not be empty',
    }),
    last_name: Joi.string().required().messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name must not be empty',
    }),
    age: Joi.number().integer().positive().required().messages({
      'any.required': 'Age is required',
      'number.base': 'Age must be a number',
      'number.integer': 'Age must be an integer',
      'number.positive': 'Age must be a positive integer',
    }),
  });
  