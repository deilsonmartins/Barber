import Usuario from '../models/Usuario';

class FileController {
  async update(req, res) {
    const id = req.userId;

    const { originalname, filename } = req.file;

    const url_avatar = `${process.env.APP_URL}/files/${filename}`;

    const { nome, email, prestador, avatar } = await Usuario.findByIdAndUpdate(
      { _id: id },
      { avatar: { nome: originalname, path: url_avatar} }
    );

    return res.json({ id, nome, email, prestador, avatar });
  }
}

export default new FileController();
