var logger = (function () {
    if (window.localStorage){
        var event = new CustomEvent('logFlush', { 
            detail:{
                logs: ()=>{ 
                    let logs = window.localStorage.getItem("frLogger");
                    window.localStorage.setItem("frLogger","");
                    return logs;
                } 
            }
        });
        var count;
        if (window.localStorage.getItem("frLogger")==undefined){
            logStorage = window.localStorage.setItem("frLogger","");
            count = 0;
        } else {
            count = window.localStorage.getItem("frLogger").split("~").length;
        }
        function log(message,type){
            let curr = window.localStorage.getItem("frLogger");
            let toAdd = `${type}:${message}`;
            if (count>0){ toAdd = `~`+toAdd; }
            window.localStorage.setItem("frLogger",`${curr}${toAdd}`);
            count++;
            if (count > 10){
                document.dispatchEvent(event);
                count = 0;
            }
        }
        console._log = (msg,...ar)=>{
            if (ar){
                for (var x = 0; x < ar.length; x++){ 
                    if (Array.isArray(ar[x])){
                        msg += ar[x].toString() 
                    }
                    else if (typeof ar[x] === "object"){
                        msg += JSON.stringify(ar[x])
                    } else {
                        msg += ar[x];
                    }
                }
            }
            log(msg,"INFO");
            console.log(msg);
        }
        console._warn = (msg,...ar)=>{
            if (ar){
                for (var x = 0; x < ar.length; x++){ 
                    if (Array.isArray(ar[x])){
                        msg += ar[x].toString() 
                    }
                    else if (typeof ar[x] === "object"){
                        msg += JSON.stringify(ar[x])
                    } else {
                        msg += ar[x];
                    }
                }
            }
            log(msg,"WARN");
            console.warn(msg);
        }
        console._error = (msg,...ar)=>{
            if (ar){
                for (var x = 0; x < ar.length; x++){ 
                    if (Array.isArray(ar[x])){
                        msg += ar[x].toString() 
                    }
                    else if (typeof ar[x] === "object"){
                        msg += JSON.stringify(ar[x])
                    } else {
                        msg += ar[x];
                    }
                }
            }
            log(msg,"ERROR");
            console.error(msg);
        }
        return {
            read(_logs){
                var logs = ``;
                if (_logs==undefined && window.localStorage.getItem("frLogger")==""){
                    return "no logs";
                }
                var storage = window.localStorage.getItem("frLogger").split("~").join("\n");
                if (_logs){
                    storage = _logs.split("~").join("\n");
                }
                var length = storage.split("\n").length;
                return `${length} logs\n${storage}`;
            }
        }
    }
})();
