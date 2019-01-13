class DocumentFaker{
    constructor(){
        this.value = "";
    } 

    write(val){
        this.value = val;
    } 

    read(){
        return this.value;
    } 
} 
module.exports = DocumentFaker;

