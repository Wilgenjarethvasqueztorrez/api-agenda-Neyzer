import Joi from 'joi';

const usersSchema = Joi.object({
  nombres: Joi.string().min(2).max(50).required(),
  apellidos: Joi.string().min(2).max(50).required(),
  correo: Joi.string().email().max(50).required(),
  fecha: Joi.date().optional(),
  nivel: Joi.number().integer().min(1).max(5).optional(),
  celular: Joi.string().optional().min(8).max(50),
  telefono: Joi.string().optional().min(8).max(50),
  carnet: Joi.string().min(10).max(50).optional(),
  rol: Joi.string().valid('admin', 'profesor', 'estudiante', 'oficina').default('estudiante'),
  carrera_id: Joi.number().integer().optional()
});

export default usersSchema;