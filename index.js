var request = require('request');
var async = require('async');
var username = process.env.STORMPATH_API_KEY_ID,
    password = process.env.STORMPATH_API_KEY_SECRET,
    url = process.env.STORMPATH_APP_HREF + '/accounts';

var concurrency = 20;

function getUrl(done){
  request({url: url,auth:{username:username,password:password}}, function(err){
    if(err){
      throw err;
    }
    console.log('GOT ' + url + ' ' + new Date());
    done(err);
  });
}

var q = async.queue(function (task, callback) {
  task(callback);
}, concurrency);


async.forever(
  function(next) {
    if(q.length()<concurrency){
      q.push(getUrl);
    }
    next();
  }
);