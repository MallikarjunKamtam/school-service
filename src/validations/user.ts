const Joi = require("joi");

export default Joi.object({
  user_name: Joi.string()
    .custom((value, { error }) => {
      // Check for spaces in the username
      if (value.includes(" ")) {
        return error("no spaces are allowed in user name");
      }
      return value;
    }, "Custom validation for username")
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .custom((value, { error }) => {
      // Check for alphanumeric with special characters and at least one uppercase
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

      if (!regex.test(value)) {
        return error("Password must be strong");
      }

      return value;
    }, "Custom validation for password")
    .min(6)
    .required(),

  role: Joi.string().valid("admin", "user", "guest").required(),
});
