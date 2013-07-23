var argo = require("argo"),
    landmarks = require("./landmarks.json");

argo()
  .route('/landmarks', function(handle){
    handle('request', function(env, next){
     env.response.statusCode = 200;
     env.response.body = landmarks;
     next(env);
    });
  }).listen(process.env.PORT || 3000); 
