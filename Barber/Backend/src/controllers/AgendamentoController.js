import { isBefore, startOfHour, parseISO, subHours } from 'date-fns';
import Agendamento from '../models/Agendamento';

import NotificacoeController from './NotificacaoController';

import Usuario from '../models/Usuario';

class AgendamentoController {
  async index(req, res) {
    const id = req.userId;
    const { page } = req.query;

    const agendamentos = await Agendamento.find({ id_usuario: id }).limit(
      20 / page
    );

    return res.json(agendamentos);
  }

  async store(req, res) {
    const { nome_prestador, data } = req.body;
    const id_usuario = req.userId;

    const prestador = await Usuario.findOne({ nome: nome_prestador });

    if (!prestador) {
      return res.status(400).json({ error: `${nome_prestador} não existe` });
    }

    if (prestador.prestador !== true) {
      return res
        .status(400)
        .json({ error: 'Só é possível marcar com prestador' });
    }
    const data_agendamento = startOfHour(parseISO(data));

    if (isBefore(data_agendamento, new Date())) {
      return res.status(400).json({ error: 'Horário indisponivel' });
    }

    const { _id: id_prestador } = prestador;

    const checksAgendamento = await Agendamento.findOne({
      id_usuario,
      id_prestador,
      data: data_agendamento,
    });

    if (checksAgendamento) {
      return res.status(400).json({ error: 'Esta data nao é permitida!' });
    }

    const agendamento = await Agendamento.create({
      id_usuario,
      id_prestador,
      data: data_agendamento,
    });

    NotificacoeController.store(req, res, data_agendamento, id_prestador);

    return res.json(agendamento);
  }

  async delete(req, res) {
    const { id_agendamento } = req.body;

    const { data } = await Agendamento.findOne({ _id: id_agendamento });
    const dataCancelamento = subHours(data, 2);

    if (isBefore(dataCancelamento, new Date())) {
      return res.status(400).json({
        error: 'Cancelamento no máximo com duas hora de antecedência',
      });
    }

    const agendamento = await Agendamento.findById(
      { _id: id_agendamento },
      function (err, doc) {
        doc.cancelado = startOfHour(parseISO(new Date()));
      }
    );

    return res.json(agendamento);
  }
}

export default new AgendamentoController();
