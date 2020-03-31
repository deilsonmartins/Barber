import { format } from 'date-fns';

import { pt } from 'date-fns/locale/pt';

import Notificacao from '../models/Notificacoes';

import Usuario from '../models/Usuario';

export class NotificacaoController {
  async index(req, res) {
    const id = req.userId;
    const prestador = Usuario.findOne({
      _id: id,
      prestador: true,
    });

    if (!prestador) {
      return res.status(400).json({ error: 'Você não é um prestador' });
    }

    const notificacoes = await Notificacao.find({
      id_prestador: id,
    });

    return res.json(notificacoes);
  }

  async store(req, res, data_agendamento, id_prestador) {
    const usuario = await Usuario.findById(req.userId);

    const data = format(data_agendamento, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notificacao.create({
      conteudo: `Novo agendamento de ${usuario.nome} para ${data}`,
      id_prestador,
    });
  }

  async update(req, res) {
    const id_notificacao = req.params.id;
   
    const notificacao = await Notificacao.findByIdAndUpdate(id_notificacao, {
      leitura: true,
    });

    return res.json(notificacao);
  }
}

export default new NotificacaoController();
