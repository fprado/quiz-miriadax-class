
// GET /quizes/question
exports.author = function( req, res ) {

  res.render('credits/author', 
               { autor: 'Félix Prado',
                 foto: '/images/felix.jpg' } );

}