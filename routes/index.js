var express = require('express');
var router  = express.Router();

var quizController       = require('../controllers/quiz_controller');
var commentController    = require('../controllers/comment_controller');
var sessionController    = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* Página de entrada (home page) */
router.get('/', function(req, res) {
    res.render('index', {
        title : 'Quiz',
        errors: []
    });
});

/* Página de créditos */
router.get('/author', function(req, res) {
    res.render('author', {
        name   : 'Félix Prado',
        picture: '<img src="/images/felix.jpg" width="100px" alt="fprado">',
	errors : []
    });
});

// Autoload de comandos con :quizId y :commentId
router.param('quizId',    quizController.load);
router.param('commentId', commentController.load);

/* Definición de rutas de sesiones */
// obtener el formulario a rellenar para hacer login
router.get('/login',  sessionController.new);
// enviar formulario para crear la sesión
router.post('/login', sessionController.create);
// destruir la sesión actual
router.get('/logout', sessionController.destroy);

/* Definición de rutas de /quizes */
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

/* Definición de rutas de comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new',                      commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',                         commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

/* Definición de rutas de estadísticas */
router.get('/quizes/statistics', statisticsController.statistics);

module.exports = router;
