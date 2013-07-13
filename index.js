var argo = require("argo"),
    url = require("url");

argo()
  .use(function(handle) {
    //Lets transplant our credentials via our proxy
    handle("request", function(env, next){
     var urlObj = url.parse(env.request.url);
     var query = {
      "client_id":"D2KNC1TFRWRELI0XFVKV1BYOMM2G0G5HIOIJARQQXN34WYCA",
      "client_secret":"5UG1V5I4XHFQQ5XCVBJ2DMCEXA5D2NWBLVTORPFAWB4GF1PM",
      "v":"20130712"
     };
     urlObj.query = query;
     env.request.url = url.format(urlObj); 
     next(env);
    });
    handle("response", function(env, next){
      env.target.response.getBody(function(err, body){
        console.log(err);
        console.log(body.toString('utf-8'));
        var body = JSON.parse(body.toString('utf-8'));
        env.target.response.body = JSON.stringify(body.response); 
        next(env);
      });
    });
  })
  .target('https://api.foursquare.com/v2/')
  .listen(process.env.PORT || 3000);