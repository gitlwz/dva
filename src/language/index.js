import languageData from './language.js';

let languageFiag =  localStorage.getItem("language");
let currDate = languageData.China;
if(!!languageFiag && languageFiag === "English"){
    currDate = languageData.English
}

export default currDate;