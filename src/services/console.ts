const consoleLog = (key: any, value: any = '') => {

    if (key && value) {
        return console.log(`%c ${key} : (${new Date().toLocaleTimeString()}) =>\n`, 'background: black; color: white; margin:6px 0;padding:2px;\n', value)
    } else {
        return console.log(key)
    }
};
export default consoleLog;