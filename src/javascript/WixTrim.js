String.prototype.wixTrim = function(){
    return this.toString().replace(/^\s*/,"").replace(/\s*$/,"");
}