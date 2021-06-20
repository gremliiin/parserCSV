const fs = require("fs");
let txt = fs.readFileSync("chord-progressions.csv", "utf8");

const cvsParser = (flag = '', sep = ';', data = '') => {
    let strings = [];
    let row = [];
    let result = [];
    let error = '';

    //Создание массива строк
    strings = data.split("\n");
    //Если файл пустой
    if( data === '') {
        return error = "empty file";
    } else if (strings.length === 1 && flag.trim() != '') {
        return error = "empty file";
    }
    
    //удаление лишнего в строках
    strings = strings.map(el => {
        el = el.trim();
        if(el[el.length - 1] === sep) {
            el = el.substring(0, el.length - 1);
        }
        return el;
    }); 

    //если флаг пустой, то заголовком будет являться 1 строка файла
    if (flag.trim() === ''){
        flag = strings.shift();
        flag = flag.split(sep);
    } else {
        flag = flag.split(sep);
    }

    //разбиение строк на ряды
    for(let i = 0; i < strings.length; i++){
        row.push(strings[i].split(sep));
        if(flag.length < strings[i].split(sep).length || flag.some(el => el.trim() === '')) {
            return error = "the size of the header does not match the size of the table";
        }
    }
    
    //Создание объекта с приведением типов
    row.forEach(el => {
        let obj = {};

        for(let i = 0; i < el.length; i++) {
            if(String(el[i].trim()) == ''){
                el[i] = 'NULL';
            }
            if(!isNaN(Number(el[i]))){
                el[i] = Number(el[i]);
            }

            if(String(el[i]).toLowerCase() === 'false'){
                el[i] = false;
            } else if(String(el[i]).toLowerCase() === 'true') {
                el[i] = true;
            } else if(String(el[i]).toLowerCase() === 'null'){
                el[i] = null;
            } else if(String(el[i]).toLowerCase() === 'undefined') {
                el[i] = undefined;
            }
            obj[flag[i]] = el[i];
        }
        result.push(obj);
    })
    return result;
}

console.log(cvsParser('', ',', txt));
