import joi from "joi";

const ThreeDPrintsSchema = joi.object({
  id: joi.string().required(),
  Print_Name: joi.string().required(),
  URL: joi.string().required(),
  Colours: joi.string().required(),
  Filament_Required: joi.number().required(),
});

export default ThreeDPrintsSchema;