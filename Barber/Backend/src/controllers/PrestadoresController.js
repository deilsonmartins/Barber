import Usuario from '../models/Usuario';

class PrestadorController {
  async index(req, res) {
    const prestadores = await Usuario.find({ prestador: true });

    return res.json(prestadores);
  }
}

export default new PrestadorController();
