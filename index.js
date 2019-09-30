var {PythonShell} = require('python-shell')

let option = {
    mode: 'json'
};

var key_list;

PythonShell.run('setup.py',option,function(err,data) {
    if (err) throw err;
    //console.log(data[0].ask)
    key_list = data[0];
    console.log(key_list.ask)
});

var attrgen = new PythonShell('attrgen.py',option);
var ask = {
    "ask": key_list.ask
};
attrgen.send(ask);
attrgen.on('message',function(data) {
    console.log(data)
    ska = data[0].ska;
})
