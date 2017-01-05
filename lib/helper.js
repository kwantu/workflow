'use strict';


function getLanguageMessage(message) {

    var language = service.getLanguage();
    var res = eval("message.i18n." + language);
    console.log(res);
    return res;


};



module.exports = {

    getLanguageMessage: getLanguageMessage

}