import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    required: 'Nome é obrigatório',
  },
  email: {
    type: String,
    trim: true,
    unique: 'E-mail já existe',
    required: 'E-mail é obrigatório',
  },
  senha: {
    type: String,
  },
  avatar: {
    nome: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  prestador: {
    type: Boolean,
    required: 'Prestador é obrigatório',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

UsuarioSchema.pre('save', function (next) {
  if (!this.isModified('senha')) {
    return next();
  }
  this.senha = bcrypt.hashSync(this.senha, 10);
  next();
});

UsuarioSchema.methods.checkSenha = function (senha, callback) {
  return callback(null, bcrypt.compareSync(senha, this.senha));
};

export default mongoose.model('Usuario', UsuarioSchema);
