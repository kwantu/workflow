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
		return data;
	},

	error: function(code, err){
		var data = {
			complete: false,
			code: code,
			message: '',
			stacktrace: err
		}
		switch (code) {
			case 'WF001':   	 
				data.message = '';
				return data;
			case 'WF002':   		 
				data.message = '';
				return data;
			case 'WF003': 
				data.message = '';
				return data;
			case 'WF004':  	 
				data.message = '';
				return data;
			case 'WF005': 		 
				data.message = '';
				return data;
			case 'WF006': 		 
				data.message = '';
				return data;
			case 'WF007': 		 
				data.message = '';
				return data;
			case 'WF008': 		 
				data.message = '';
				return data;
			case 'WF009': 		 
				data.message = '';
				return data;
			case 'WF010': 		 
				data.message = '';
				return data;
			case 'WF011': 		 
				data.message = '';
				return data;
			case 'WF012': 		 
				data.message = '';
				return data;
			case 'WF013': 		 
				data.message = '';
				return data;
			case 'WF014': 		 
				data.message = '';
				return data;
			case 'WF015': 		 
				data.message = '';
				return data;
			case 'WF016': 		 
				data.message = '';
				return data;
			case 'WF017': 		 
				data.message = '';
				return data;
			case 'WF018': 		 
				data.message = '';
				return data;
			case 'WF019': 		 
				data.message = '';
				return data;
			case 'WF020': 		 
				data.message = '';
				return data;
			default: 		 
				data.code = 'ERR001';
				data.message = 'Default error message, please add a more specific error code and message. See stacktrace for more information.';
				return data;
		}
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