let axios = require('axios');
let cheerio = require('cheerio');

let companytoList = [];
let url = 'http://www.techinfrance.fr/membres/pages/20/page/';

mainScraping().then(() =>{
    console.log(companytoList.length);
} );

async function mainScraping() { 
    for(i = 1; i <= 4; i++){
        console.log(url + i);
        await getData(url + i);
        await sleep(2000);
    } 
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function getData (url) {
    await axios.get(url)
    .then((response) => {
        if(response.status === 200) {
            html = response.data;
            $ = cheerio.load(html); 
            
            companyNames = $('li', 'ul[data-module-el=result]').find('a').each(function(i, elem){
                console.log(url + ' : ' + elem.attribs.href);
                
                companyItem = elem.attribs.href;

                companytoList.push(companyItem);
            }); 
            console.log(companytoList)
        }
    }, 
        (error) => console.log(error)
    );
} 
