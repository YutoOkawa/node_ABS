var {PythonShell} = require('python-shell')

let option = {
    mode: 'json'
};

var key_list;

const absSetup = () => {
    return new Promise((resolve,reject) => {
        PythonShell.run('setup.py',option,function(err,data) {
            if (err) throw err;
            key_list = data[0];
            // console.log(key_list.ask)
            resolve(true)
        });
    });
}

const absAttrgen = (key_list) => {
    return new Promise((resolve,reject) => {
        var attrgen = new PythonShell('attrgen.py',option);
        var ask = {
            "ask": key_list.ask
        };
        attrgen.send(ask);
        attrgen.on('message',function(data) {
            ska = data.ska;
            // console.log(ska);
            resolve(ska);
        });
    });
}

const absSign = (key_list,ska,message,policy) => {
    return new Promise((resolve,reject) => {
        var signgen = new PythonShell('sign.py',option);
        var signer = {
            "tpk":key_list.tpk,
            "apk":key_list.apk,
            "ska":ska,
            "message":message,
            "policy":policy
        };
        signgen.send(signer);
        signgen.on('message',function(data) {
            var sign = data.sign;
            // console.log(sign);
            resolve(sign);
        });
    });
}

const absVer = (key_list,sign,message,policy) => {
    return new Promise((resolve,reject) => {
        var verify = new PythonShell('ver.py',option);
        var verifier = {
            "tpk":key_list.tpk,
            "apk":key_list.apk,
            "sign":sign,
            "message":message,
            "policy":policy
        };
        verify.send(verifier);
        verify.on('message',function(data) {
            var bool = data.result;
            // console.log(bool);
            resolve(bool);
        });
    });
}

const absSystem = async() => {
    // var key_list;
    var message = "message";
    var policy = "HRD OR DD AND SCHIEF";
    // var policy = "DD AND SCHIEF";
    console.time("Setup");
    const check = await absSetup();
    if (check) {
        console.timeEnd("Setup");
        console.log("Setup Completed.");
    }
    console.time("AttrGen");
    const ska = await absAttrgen(key_list);
    console.timeEnd("AttrGen");
    console.log("Key Generated.")

    console.time("Sign");
    const sign = await absSign(key_list,ska,message,policy);
    console.timeEnd("Sign");
    console.log("Sign Generated.");

    console.time("Ver");
    const ver = await absVer(key_list,sign,message,policy);
    console.timeEnd("Ver");
    if (ver) console.log("OK");
    else console.log("NG");
}

absSystem();


// var attrgen = new PythonShell('attrgen.py',option);
// var ask = {
//    "ask": key_list.ask
// };
//attrgen.send(ask);
//attrgen.on('message',function(data) {
//    console.log(data)
//    ska = data[0].ska;
//})
