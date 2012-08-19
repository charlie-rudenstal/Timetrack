traceur = global.traceur || {};require("traceur-runtime");
var models = require('../models'); 
var Deferred = traceur.runtime.Deferred; 
module.exports = { get_index: function(req, res) { 
    var $that = this; 
    var $state = 4; 
    var $storedException; 
    var $finallyFallThrough; 
    var member; 
    var members; 
    var $value; 
    var $err; 
    var $result = new Deferred(); 
    var $waitTask; 
    var $continuation =(function() { 
      while(true) try { 
        switch($state) { 
          case 4: 
            member = new models.Member(); 
            $state = 5; 
            break; 

          case 5: 
            member.name = Math.random() >= 0.5 ? 'Charlie': 'Julian'; 
            $state = 7; 
            break; 

          case 7: 
            member.save(); 
            $state = 9; 
            break; 

          case 9: 
            ; 
            $state = 11; 
            break; 

          case 11: 
            $waitTask = models.Member.asyncFind({ }); 
            $waitTask.then($createCallback(1), $createErrback(2)); 
            return; 
            $state = 1; 
            break; 

          case 1: 
            members = $value; 
            $state = 3; 
            break; 

          case 2: 
            throw $err; 
            $state = 3; 
            break; 

          case 3: 
            res.render('index', { members: members }); 
            $state = 13; 
            break; 

          case 13: 
            $result.callback(undefined); 
            $state = 15; 
            break; 

          case 15: 
            return; 

          case 14: 
            $result.errback($storedException); 
            $state = 15; 
            break; 

          default: 
            throw "traceur compiler bug: invalid state in state machine" + $state; 

        } 
      } catch($caughtException) { 
        $storedException = $caughtException; 
        switch($state) { 
          default: 
            $state = 14; 
            break; 

        } 
      } 
    }).bind($that); 
    var $createCallback = function($newState) { 
      return function($0) { 
        $state = $newState; 
        $value = $0; 
        $continuation(); 
      }; 
    }; 
    var $createErrback = function($newState) { 
      return function($0) { 
        $state = $newState; 
        $err = $0; 
        $continuation(); 
      }; 
    }; 
    $continuation(); 
    return $result.createPromise(); 
  } }; 
