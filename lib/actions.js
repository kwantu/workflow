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

        createCommunity: function(_WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                var uuid = JSON.xpath("/indicators[category/term eq 'Community']/_id", app.SCOPE.workflow, {})[0];
                var action = {
                    "createCommunity": {
                        "newCommunityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Community": uuid
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject);
                resolve(workerObject);
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

var worker = (function() {


    return {

        getWorkerWrapper: function() {

            var wrapper = {
                "source": "remote",
                "type": "workerObject",
                "_id": "",
                "channels": [],
                "communityId": "",
                "applicationId": "",
                "message": "",
                "messageType": "info",
                "createdDateTime": "",
                "senderUserId": "",
                "notification": {

                },
                "action": {

                }
            };

            return wrapper;

        },
        send: function(object) {

            return new Promise(function(resolve, reject) {

                resolve('packet submitted');


            });

        }
    }

})();

module.exports = {

    community: community,
    worker: worker

}