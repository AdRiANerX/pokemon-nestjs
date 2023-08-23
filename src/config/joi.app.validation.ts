import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
});
