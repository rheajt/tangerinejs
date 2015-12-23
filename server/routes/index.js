'use strict';

var IdeaController = require(process.cwd() + '/server/controllers/ideaController');

module.exports = function(app) {

  var ideaCtrl = new IdeaController();

  app.route('/api/ideas')
    .get(ideaCtrl.getIdeas);

}