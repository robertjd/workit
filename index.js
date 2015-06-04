var request = require('request');
var async = require('async');
var username = process.env.STORMPATH_API_KEY_ID,
    password = process.env.STORMPATH_API_KEY_SECRET,
    url = process.env.STORMPATH_APP_HREF + '/accounts';

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
}, 20);


async.forever(
  function(next) {
    if(q.length()<20){
      q.push(getUrl);
    }
    next();
  }
);