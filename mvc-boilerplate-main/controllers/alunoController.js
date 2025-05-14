// Em controllers/alunoController.js
const Curso = require('../models/curso');
const Aluno = require('../models/aluno');

exports.index = async (req, res) => {
  const alunos = await Aluno.findAllComCurso();
  const cursos = await Curso.findAll();
  res.render('alunos/index', { alunos, cursos });
};

exports.store = async (req, res) => {
  const { nome, curso_id } = req.body;
  const aluno = await Aluno.create({ nome, curso_id });  // Exemplo de criação de aluno
  res.redirect('/alunos');  // Redireciona para a lista de alunos
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, curso_id } = req.body;
  const aluno = await Aluno.update({ nome, curso_id }, { where: { id } });
  res.redirect('/alunos');  // Redireciona para a lista de alunos
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Aluno.destroy({ where: { id } });
  res.redirect('/alunos');  // Redireciona para a lista de alunos
};

exports.byCurso = async (req, res) => {
  const { curso_id } = req.params;
  const alunos = await Aluno.findByCurso(curso_id);
  res.json(alunos);
};
