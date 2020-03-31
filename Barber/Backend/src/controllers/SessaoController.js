import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';

import authConfig from '../../config/auth';

class SessaoController {
  async store(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ error: 'Usuario não existe' });
    }

    usuario.checkSenha(senha, (error, match) => {
      if (!match) {
        return res.status(400).json({ error: 'Senha incorreta' });
      }
    });

    const { _id: id, nome, prestador, avatar } = usuario;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expireIn,
    });

    return res.json({
      usuario: {
        id,
        nome,
        email,
        prestador,
        avatar,
      },
      token: {
        token,
      },
    });
  }
}

export default new SessaoController();
