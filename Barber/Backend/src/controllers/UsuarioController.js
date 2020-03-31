import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const { email } = req.body;

    const checksUsuario = await Usuario.findOne({ email });

    if (checksUsuario) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { _id: id, nome, prestador } = await Usuario.create(req.body);

    return res.json({ id, nome, prestador });
  }

  async update(req, res) {
    const {
      nome,
      email,
      senhaAntiga,
      novaSenha,
      prestador,
      confirmacaoSenha,
    } = req.body;

    const checksEmail = await Usuario.findOne({ email });

    if (checksEmail && checksEmail.email !== email) {
      return res.status(400).json({ error: 'e-mail já existe' });
    }

    const id = req.userId;

    const usuario = await Usuario.findById({ _id: id });

    if (senhaAntiga) {
      usuario.checkSenha(senhaAntiga, (error, match) => {
        if (!match) {
          return res.status(400).json({ error: 'Senha incorreta' });
        }
      });
    }

    if (novaSenha && novaSenha !== confirmacaoSenha) {
      return res.status(400).json({ error: 'Confirmação de senha incorreta' });
    }

    Usuario.findById({ _id: id }, function (err, doc) {
      doc.nome = nome;
      doc.email = email;
      doc.prestador = prestador;

      if (novaSenha) {
        doc.senha = novaSenha;
      }
      doc.save();
    });

    return res.json({ id, nome, email, prestador });
  }
}

export default new UsuarioController();
