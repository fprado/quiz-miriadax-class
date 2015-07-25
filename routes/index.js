 var express = require('express');
 var router = express.Router();
 
var quizController = require('../controllers/quiz_controller.js');
var creditsController = require('../controllers/credits.js');

 /* GET home page. */
 router.get('/', function(req, res) {
   res.render('index', { title: 'Quiz' });
 });
 
 // Autoload de comandos con :quizId
 router.param('quizId', quizController.load);

/* Quiz: answer */
router.get('/quizes/answer', quizController.answer);
/* Definición de rutas de /quizes */
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', creditsController.author );

 module.exports = router;