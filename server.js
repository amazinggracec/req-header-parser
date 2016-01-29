var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT;
var proxyaddr = require('proxy-addr');
var accepts = require('accepts');
var useragent = require('useragent');

app.get("/", function(req,res){
  var accept = accepts(req);
  var agent = useragent.parse(req.headers['user-agent']);
  res.json(
      {ipaddress: proxyaddr(req, function(addr){
        return addr;
      }),
      language: accept.language()[0],
      software: agent.toString()
    }
  );
});

app.listen(port || 8080, function(){
  console.log("server listening at", port);
});
