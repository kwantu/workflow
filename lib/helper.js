'use strict';


function getLanguageMessage(message) {

    var language = service.getLanguage();
    var res = message.i18n[language];
    return res;

};

function numberWithCommas(x) {
    if(x.toString().startsWith("<")){
        return x.toString();
    }
    else{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function getNodeValue(data, _WFInstance, uuid) {

    return new Promise(function(resolve, reject) {
        
        if(typeof data == 'string'){
            resolve(data);
        }
        else if (data.value != undefined) {

            var inputDataType = 'string';

            if (data.value.datatype.dataType != undefined) {
                inputDataType = data.value.datatype.dataType;
            } else {
                inputDataType = data.value.datatype;
            }


            var inputValue = data.value.data;

            if (inputDataType == 'number') {
                resolve(Number(inputValue));
            } else if (inputDataType == 'string') {
                resolve(inputValue);
            } else if (inputDataType == 'integer') {
                resolve(parseInt(inputValue));
            } else if (inputDataType == 'decimal') {
                resolve(parseFloat(inputValue));
            } else if (inputDataType == 'date' || inputDataType == 'dateTime') {
                resolve(inputValue);
            } else {
                // In case data type not matched
                resolve(inputValue);
            }

        } else if (data.indicatorUUID != undefined) {

            // A change is required to make sure proper scope is identified.
            var indicatorUUID = null;

            var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
            
            if (subprocess.indicators.length == 0) {

                indicatorUUID = JSON.xpath("/indicators[category/term eq '" + data.indicatorUUID.indicatorSetId + "']/_id", _WFInstance, {})[0];

            } else {

                indicatorUUID = JSON.xpath("/indicators[id eq '" + data.indicatorUUID.indicatorSetId + "']/instances/uuid", subprocess, {})[0];
                if (indicatorUUID == undefined) {
                    indicatorUUID = JSON.xpath("/indicators[category/term eq '" + data.indicatorUUID.indicatorSetId + "']/_id", _WFInstance, {})[0];
                }
            }



            resolve(indicatorUUID);

        } else if (data.indicator != undefined) {

            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
            
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var basepath = "";
            if(data.indicator.basepath != undefined){
                basepath = data.indicator.basepath;
            }
            var xpath = '/model/pending/data/' + data.indicator.indicatorSetId + basepath + '/' + data.indicator.elementId;

            //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
            //var part = library.getSubprofileSubprocessIds();

            // if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
            //     seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
            // }

            var seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                var part = library.getSubprofileSubprocessIds();
                seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id and uuid = "+ part +"])", _WFInstance, {})[0] + 1;
            }

            var replacedPath = replaceAll(xpath, '#SEQUENCE#', seq);

            var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];
            var concatValidDate = "'" + validDate + "'";
            var newPath = replaceAll(replacedPath, '#END_DATE#', concatValidDate);
            var dotReplaced = replaceAll(newPath, '[.]', '/');
            if(basepath.length > 0){
                var retValue = JSON.xpath(dotReplaced, indObject, {});
                resolve(retValue);
            }
            else{
                var retValue = JSON.xpath(dotReplaced, indObject, {})[0];
                if(data.indicator.addString != undefined && data.indicator.addString != ""){
                    retValue = retValue + data.indicator.addString
                }
                resolve(retValue);
            }
            
        } else if (data.system != undefined) {

            resolve("ERROR: Unimplemented system type found.");

        } else if (data.variable != undefined) {

            /**
             * 
             * Taken out of schema
             * 
                        "subProcessInstance": {
                            "type": "string",
                            "description": "value of the variable subProcessInstance variable current subprocessInstance"
                        },
                        "step": {
                            "type": "string",
                            "description": "value of the variable in the current step"
                        },
                        "subProcessId": {
                            "type": "string",
                            "description": "value of the current applicaiton ID"
                        }
             * 
             * 
             * 
             */
            if (data.variable.profile != undefined) {

                var variableName = data.variable.profile;

                var profileId = _WFInstance.profile;
                var profileVariableFileName = profileId + ':variables';

                dao.get(profileVariableFileName).then(function(file) {

                    if(data.variable.type != undefined){
                        if(data.variable.type == "count"){
                            resolve(file[data.variable.name].length);
                        } else {
                            reject("ERROR: Profile variables type implementation - Case not found");
                        }
                    } else {

                        
                        var finalValue = file;
                        var pathToElement = variableName == "" ? [] : variableName.split(/['"\[\].]+/);

                        for (var k = 0; k < pathToElement.length; k++) {
                            if(pathToElement[k] == "") continue;
                            finalValue = finalValue[pathToElement[k]];
                        }
                        var obj = finalValue;

                        if(obj == undefined){
                            reject("Variable not found");
                        }
                        else if (typeof obj == 'object') {

                            var getSeq = function(){
                                return new Promise(function(res, rej){

                                    var seq = 0;

                                    if(data.variable.periodic == undefined || 
                                        data.variable.periodic.seq == undefined){

                                            //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                                    
                                            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
                                            //var part = library.getSubprofileSubprocessIds();
                    
                                            // if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                                            //     seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
                                            // }
                    
                    
                                            seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                                            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                                                var part = library.getSubprofileSubprocessIds();
                                                seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id and uuid = "+ part +"])", _WFInstance, {})[0] + 1;
                                            }

                                            res(seq);

                                    }
                                    else{
                                        getNodeValue(data.variable.periodic.seq, _WFInstance, uuid)
                                        .then(function(seqVar){
                                            res(seqVar);
                                        })
                                        .catch(function(err){
                                            rej(err);
                                        });
                                    }

                                });
                            }

                            var getVal = function(){

                                return new Promise(function(res,rej){

                                    var vParam = "value";

                                    if(data.variable.periodic != undefined && 
                                        data.variable.periodic.value != undefined){
                                            getNodeValue(data.variable.periodic.value, _WFInstance, uuid)
                                            .then(function(vPar){
                                                res(vPar);
                                            })
                                            .catch(function(err){
                                                rej(err);
                                            });
                                    }
                                    else{
                                        res(vParam);
                                    }

                                });

                            };
                            
    
                            
                            getSeq()
                            .then(function(seq){
                                getVal()
                                .then(function(vParam){
                                    var valuePath = "/" + variableName + "[" + seq + "]/" + vParam;
                                    var retValue = JSON.xpath(valuePath, file, {})[0];
                                    resolve(retValue);
                                })
                                .catch(function(err){
                                    reject(err);
                                });
                            })
                            .catch(function(err){
                                reject(err);
                            });
    
    
                            
    
    
    
                        } else if (typeof obj == 'string') {
    
                            resolve(obj);
    
                        }

                    }
                   

                }).catch(function(error) {

                    reject("ERROR: Profile variables not found");

                });

            } else if(data.variable.subProfile != undefined){

                var variableName = data.variable.subProfile;
                var subprofileId = app.profile.subprofileId
                if(data.variable.subprofileId != undefined && data.variable.subprofileId != ""){
                    subprofileId = data.variable.subprofileId;
                }
               // var profileId = _WFInstance.profile;
                var profileVariableFileName =  subprofileId + ':variables';

                dao.get(profileVariableFileName).then(function(file) {


                    var finalValue = file;
                    var pathToElement = variableName == "" ? [] : variableName.split(/['"\[\].]+/);

                    for (var k = 0; k < pathToElement.length; k++) {
                        if(pathToElement[k] == "") continue;
                        finalValue = finalValue[pathToElement[k]];
                    }
                    var obj = finalValue;

                    if(obj == undefined){
                        reject("Variable not found");
                    }
                    else if (typeof obj == 'object') {

                        var seq = 0;

                        if(data.variable.periodic == undefined || 
                            data.variable.periodic.seq == undefined){

                            //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                        
                            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
                            //var part = library.getSubprofileSubprocessIds();

                            // if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            //     seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
                            // }

                            seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                                var part = library.getSubprofileSubprocessIds();
                                seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + uuid + "']/id and uuid = "+ part +"])", _WFInstance, {})[0] + 1;
                            }
                        }
                        else{
                            seq = getNodeValue(data.variable.periodic.seq, _WFInstance, uuid);
                        }


                        var vParam = "value";
                            
                        if(data.variable.periodic != undefined && 
                            data.variable.periodic.value != undefined){
                                vParam = getNodeValue(data.variable.periodic.value, _WFInstance, uuid);
                        }


                        var valuePath = "/" + variableName + "[" + seq + "]/" + vParam;
                        var retValue = JSON.xpath(valuePath, file, {})[0];
                        resolve(retValue);



                    } else if (typeof obj == 'string') {

                        resolve(obj);

                    }

                }).catch(function(error) {

                    reject("ERROR: sub Profile variables not found");

                });


            } else {
                reject("ERROR: Unimplemented profile type found.");
            }

        } else if (data.indicatorWrapper != undefined) {

            var indicatorSet = data.indicatorWrapper.indicatorSetId;
            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
           
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var elementpath = replaceAll(data.indicatorWrapper.path, "[.]", "/")
            var xpath = '/' + elementpath
            var value = JSON.xpath(xpath, indObject, {})[0];
            resolve(value);

        } else if (data.calculated != undefined) {


            var value = '';
            var separator = data.calculated.separator;

            for (var i = 0; i < data.calculated.elements.length - 1; i++) {

                var elements = data.calculated.elements;
                
                var possibleItems = ["fromRepeat", "elementProperty", "constantValue", "elementWrapper", "currentDate", "randomDigits", "profileObjectElement", "profileObjectWrapper", "currentFinancialYear", "scopeVariable", "xpath"];
                switch (propertyExists(elements[i], possibleItems)) {

                    case 'elementProperty':
                        var indicatorSet = elements[i].elementProperty.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                       
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var elementpath = replaceAll(elements[i].elementProperty.elementId, "[.]", "/")
                        var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;


                    case 'constantValue':

                        var itemValue = elements[i].constantValue.value;
                        value = value + itemValue + separator;
                        break;

                    case 'scopeVariable':

                        var varName = elements[i].scopeVariable;
                        var itemValue = "";
                        if(varName == "#USER_ID"){
                            itemValue = _lclx.SUBSCRIPTIONS.userId;
                        }
                        else if(varName == "#USERNAME"){
                            itemValue = _lclx.SESSION.username;
                        }
                        else if(varName == "#FIRSTNAME"){
                            itemValue = _lclx.SESSION.firstName;
                        }
                        else if(varName == "#LASTNAME"){
                            itemValue = _lclx.SESSION.lastName;
                        }
                        if(itemValue.length > 0){
                            value = value + itemValue + separator;
                        }
                        
                        break;

                    case 'elementWrapper':
                        var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var elementpath = replaceAll(elements[i].elementWrapper.elementId, "[.]", "/")
                        var xpath = '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;


                    case 'currentDate':

                        value = value + formatDate(new Date()) + separator;
                        break;

                    case 'randomDigits':
                        var digits = elements[i].randomDigits.digits;
                        var random = Math.random();
                        var exp = Math.pow(10, digits);
                        var intPart = (random * exp) ^ 0
                        value = value + intPart + separator;
                        break;

                    case 'profileObjectElement':

                        var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                        var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                        var elementpath = replaceAll(elements[i].profileObjectElement.elementId, "[.]", "/")
                        var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;

                    case 'profileObjectWrapper':

                        var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                        var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                        var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId, "[.]", "/")
                        var xpath = '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;
                    case 'currentFinancialYear':

                        var startDate = elements[i].currentFinancialYear.startDate;
                        var startMonth = elements[i].currentFinancialYear.startMonth;
                        var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                        value = value + financialYear + separator;
                        break;
                    case 'fromRepeat':

                        var indicatorSet = elements[i].fromRepeat.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                        
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var elementpath = replaceAll(elements[i].fromRepeat.path, "[.]", "/");
                        var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                        var filter = '';
                       
                        if(elements[i].fromRepeat.filter == 'validDate'){
                            var sp = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                            var vd = sp.dates.valid;
                            filter = "[enddate eq '"+ vd +"']/"
                       
                        }
                        xpath = xpath + filter + replaceAll(elements[i].fromRepeat.element, "[.]", "/");

                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        

                        break;
                    case 'xpath':
                        if(elements[i].xpath.indicatorSetId != undefined
                            && elements[i].xpath.indicatorSetId.length > 0){
                            var indicatorSet = elements[i].xpath.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var itemValue = JSON.xpath(elements[i].xpath.expr, indObject, {})[0];
                            value = value + itemValue + separator;
                            break;
                        }
                        else{
                            var itemValue = JSON.xpath(elements[i].xpath.expr, _WFInstance, {})[0];
                            value = value + itemValue + separator;
                            break;
                        }
                        
                        

                    default:
                        reject("No method found from implemented list.");
                        break;
                }

            }

            var i = data.calculated.elements.length - 1;
            var elements = data.calculated.elements;

            var possibleItems = ["fromRepeat","elementProperty", "constantValue", "elementWrapper", "currentDate", "randomDigits", "profileObjectElement", "profileObjectWrapper", "currentFinancialYear", "scopeVariable", "xpath"];
            switch (propertyExists(elements[i], possibleItems)) {

                case 'elementProperty':
                    var indicatorSet = elements[i].elementProperty.indicatorSetId;
                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                    
                    var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                    var elementpath = replaceAll(elements[i].elementProperty.elementId, "[.]", "/")
                    var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;


                case 'constantValue':

                    var itemValue = elements[i].constantValue.value;
                    value = value + itemValue;
                    break;
                case 'scopeVariable':

                    var varName = elements[i].scopeVariable;
                    var itemValue = "";
                    if(varName == "#USER_ID"){
                        itemValue = _lclx.SUBSCRIPTIONS.userId;
                    }
                    else if(varName == "#USERNAME"){
                        itemValue = _lclx.SESSION.username;
                    }
                    else if(varName == "#FIRSTNAME"){
                        itemValue = _lclx.SESSION.firstName;
                    }
                    else if(varName == "#LASTNAME"){
                        itemValue = _lclx.SESSION.lastName;
                    }
                    if(itemValue.length > 0){
                        value = value + itemValue;
                    }
                    
                    break;

                case 'elementWrapper':
                    var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                    
                    var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                    var elementpath = replaceAll(elements[i].elementWrapper.elementId, "[.]", "/")
                    var xpath = '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;


                case 'currentDate':

                    value = value + formatDate(new Date());
                    break;

                case 'randomDigits':
                    var digits = elements[i].randomDigits.digits;
                    var random = Math.random();
                    var exp = Math.pow(10, digits);
                    var intPart = (random * exp) ^ 0
                    value = value + intPart;
                    break;

                case 'profileObjectElement':

                    var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                    var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                    var elementpath = replaceAll(elements[i].profileObjectElement.elementId, "[.]", "/")
                    var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;

                case 'profileObjectWrapper':

                    var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                    var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                    var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId, "[.]", "/")
                    var xpath = '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;

                case 'currentFinancialYear':

                    var startDate = elements[i].currentFinancialYear.startDate;
                    var startMonth = elements[i].currentFinancialYear.startMonth;
                    var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                    value = value + financialYear;
                    break;
                
                case 'fromRepeat':

                    var indicatorSet = elements[i].fromRepeat.indicatorSetId;
                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                    
                    var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                    var elementpath = replaceAll(elements[i].fromRepeat.path, "[.]", "/");
                    var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                    var filter = '';
                   
                    if(elements[i].fromRepeat.filter == 'validDate'){
                        var sp = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var vd = sp.dates.valid;
                        filter = "[enddate eq '"+ vd +"']/"
                   
                    }
                    xpath = xpath + filter + replaceAll(elements[i].fromRepeat.element, "[.]", "/");

                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    

                    break;

                case 'xpath':
                    if(elements[i].xpath.indicatorSetId != undefined
                        && elements[i].xpath.indicatorSetId.length > 0){
                        var indicatorSet = elements[i].xpath.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var itemValue = JSON.xpath(elements[i].xpath.expr, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;
                    }
                    else{
                        var itemValue = JSON.xpath(elements[i].xpath.expr, _WFInstance, {})[0];
                        value = value + itemValue + separator;
                        break;
                    }
                
                default:
                    reject("No method found from implemented list.");
                    break;
            }




            resolve(value);

        } else if (data.subProcess != undefined) {

            if (data.subProcess.path != undefined) {

                var path = data.subProcess.path;
                var arr = path.split(".");
                var pathItems = "";
                for (var i = 0; i < arr.length; i++) {
                    pathItems = pathItems + "['" + arr[i] + "']";
                }
                var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                
                var finalValue = subprocess;
                var pathToElement = pathItems == "" ? [] : pathItems.split(/['"\[\].]+/);

                for (var k = 0; k < pathToElement.length; k++) {
                    if(pathToElement[k] == "") continue;
                    finalValue = finalValue[pathToElement[k]];
                }
                var value = finalValue;
                resolve(value)

            } else if (data.subProcess.stepUser != undefined) {

            }



        }

    });



};


function replaceAll(txt, replace, with_this) {
    if (typeof txt.replace != 'function') {
        console.log(replace + ' ' + with_this);
        console.log(txt);
    }
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

function formatDate(date) {

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '-' + monthIndex + '-' + year;
}


function compare(subject, operator, value) {
    switch (operator) {
        case '>':
            return subject > value;
        case '<':
            return subject < value;
        case '>=':
            return subject >= value;
        case '<=':
            return subject <= value;
        case '==':
            if(subject == undefined){
                subject = "";
            }
            return subject === value;
        case '!=':
            return subject !== value;
    }
};


module.exports = {

    getLanguageMessage: getLanguageMessage,
    getNodeValue: getNodeValue,
    compare: compare

}