import { startOfDay, endOfDay, parseISO } from 'date-fns';
import Usuario from '../models/Usuario';

import Agendamento from '../models/Agendamento';

class AgendaController {
  async index(req, res) {
    const id = req.userId;
    const { data } = req.headers;
    const parseDate = parseISO(data);

    const checksPrestador = await Usuario.findOne({ _id: id, prestador: true });

    if (checksPrestador === null) {
      return res
        .status(400)
        .json({ error: 'Você não é um prestador de serviço' });
    }

    const agenda = await Agendamento.find({
      id_prestador: id,
      data: {
        $gte: startOfDay(parseDate),
        $lt: endOfDay(parseDate),
      },
    });

    return res.json(agenda);
  }
}

export default new AgendaController();
