'use strict';

var util = require('utility');
/**
 * Actions Module
 *
 * @module lib/actions
 * @author Hasan Abbas
 * @version 2.0.0
 * @description test description
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */


var community = (function() {


    return {

        createCommunity: function(param1) {

            return new Promise(function(resolve, reject) {
                resolve(param1);
            });

        },
        setVariable: function(param1) {

            return new Promise(function(resolve, reject) {

            });

        },
        userJoinCommunity: function(param1) {

            return new Promise(function(resolve, reject) {

            });

        }



    }

})();

module.exports = {

    community: community

}