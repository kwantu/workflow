'use strict';

/**
 * Utility Module
 *
 * @module modules/util
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

 module.exports = { 

 	success: function(message, res){
		var data = {
			complete: true,
			message: message,
			res: res
		}
		return data;
	},

	warn: function(message, res){
		var data = {
			complete: true,
			warning: message,
			res: res
		}
		console.warn(data);
		return data;
	},

	error: function(code, message){
		var err = new Error('');
		err.name = code;
		err.message = message;
		return err;
	},

 	syncLoop: function(iterations, process, exit){  
	    var index = 0,
	        done = false,
	        shouldExit = false;
	    var loop = {
	        next:function(){
	            if(done){
	                if(shouldExit && exit){
	                    return exit(); // Exit if we're done
	                }
	            }
	            // If we're not finished
	            if(index < iterations){
	                index++; // Increment our index
	                process(loop); // Run our process, pass in the loop
	            // Otherwise we're done
	            } else {
	                done = true; // Make sure we say we're done
	                if(exit) exit(); // Call the callback on exit
	            }
	        },
	        iteration:function(){
	            return index - 1; // Return the loop number we're on
	        },
	        break:function(end){
	            done = true; // End the loop
	            shouldExit = end; // Passing end as true means we still call the exit callback
	        }
	    };
	    loop.next();
	    return loop;
	},

	compare: function(subject, operator, value) {
	  	switch (operator) {
	  		case 'greaterThan':   	 
				return subject > value;
			case 'lessThan':   		 
				return subject < value;
			case 'greaterThanEqual': 
				return subject >= value;
			case 'lessThanEqual':  	 
				return subject <= value;
			case 'equalTo': 		 
				return subject === value;
			case 'notEqualTo': 		 
				return subject !== value;
	  	}
	}
	
 }