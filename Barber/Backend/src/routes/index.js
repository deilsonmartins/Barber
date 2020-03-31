import { Router } from 'express';

import multer from 'multer';

import authConfig from '../middlewares/auth';

import multerConfig from '../../config/multer';

import UsuarioController from '../controllers/UsuarioController';

import NotificacaoController from '../controllers/NotificacaoController';

import SessaoController from '../controllers/SessaoController';

import FileController from '../controllers/FileController';

import PrestadoresController from '../controllers/PrestadoresController';

import AgendaController from '../controllers/AgendaController';

import AgendamentoController from '../controllers/AgendamentoController';

const upload = multer(multerConfig);

const Routes = new Router();

Routes.post('/usuarios', UsuarioController.store);

Routes.post('/sessao', SessaoController.store);

Routes.use(authConfig);

Routes.post('/files', upload.single('file'), FileController.update);

Routes.post('/update', UsuarioController.update);

Routes.get('/prestadores', PrestadoresController.index);

Routes.post('/agendamento', AgendamentoController.store);

Routes.get('/agendamento-usuario', AgendamentoController.index);

Routes.get('/agenda', AgendaController.index);

Routes.post('/delete-agendamento', AgendamentoController.delete);

Routes.get('/notificacoes', NotificacaoController.index);

Routes.put('/notificacoes/:id', NotificacaoController.update);

export default Routes;
