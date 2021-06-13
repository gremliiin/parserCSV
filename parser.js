const fs = require("fs");
let txt = fs.readFileSync("flavors.csv", "utf8");



const cvsParser = (flag = '', sep = ';', data = '') => {
    let strings = [];
    let row = [];
    let result = [];
    let error = [];

    strings = data.split("\n");

    strings = strings.map(el => {
        return el.replace('\r', '');
    });
    
    strings = strings.map(el => {
        if(el[el.length - 1] === sep) {
            let arr = [];
            arr = el.split('');
            arr.pop();
            el = arr.join('');
        }

        return el;
    }); 

    if( data === '') {
        error.push("empty file");
    } else if (strings.length === 1 && flag.trim() != '') {
        error.push("empty file");
    }

    if (flag.trim() === ''){
        flag = strings.shift();
        flag = flag.split(sep);
    } else {
        flag = flag.split(sep);
    }


    for(let i = 0; i < strings.length; i++){
        row.push(strings[i].split(sep));
        if(flag.length < strings[i].split(sep).length || flag.some(el => el.trim() === '')) {
            error.push("the size of the header does not match the size of the table");
            break;
        }
    }

    
    
    
    row.forEach(el => {
        let obj = {};

        for(let i = 0; i < el.length; i++) {
            if(String(el[i].trim()) == ''){
                el[i] = 'empty';
            }
        }

        for(let i = 0; i < el.length; i++) {
            if(!isNaN(Number(el[i]) && el[i] != null )){
                el[i] = Number(el[i]);
            }
        }

        for(let i = 0; i < el.length; i++) {
            if(String(el[i]).toLowerCase() === 'false'){
                el[i] = false;
            } else if(String(el[i]).toLowerCase() === 'true') {
                el[i] = true;
            }
        }

        for(let i = 0; i < el.length; i++) {
            if(String(el[i]) === 'empty'){
                el[i] = null;
            }
        }

        for(let i = 0; i < el.length; i++) {
            obj[flag[i]] = el[i];
        }

        result.push(obj);
    })

    if(error.length === 0) {
        return result;
    } else {
        return error;
    }
}

console.log(cvsParser('', ',', txt));
