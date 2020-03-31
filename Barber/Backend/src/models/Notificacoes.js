import mongoose from 'mongoose';

const NotificacoesSchema = new mongoose.Schema(
  {
    conteudo: {
      type: String,
      required: true,
    },
    id_prestador: {
      type: String,
      required: true,
    },
    leitura: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notificacao', NotificacoesSchema);
