import mongoose from 'mongoose';

const AgendamentoSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: 'Id do usuario é obrigatório',
  },
  id_prestador: {
    type: String,
    required: 'Id do prestador é obrigatório',
  },
  data: {
    type: Date,
    required: 'Data da marcação é obrigatória',
  },
  cancelado: {
    type: Date,
    default: null,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model('Agendamento', AgendamentoSchema);
