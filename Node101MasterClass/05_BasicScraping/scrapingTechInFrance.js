let axios = require('axios');
let cheerio = require('cheerio');
let documentFaker = require('./documentFaker');
const fs = require('fs');

let companytoList = [];
let results = []; 
let url = 'http://www.techinfrance.fr/membres/pages/20/page/';

mainScraping().then(() =>{
    console.log(companytoList.length);

    
    
}).then(() =>{
    detailedCompanyInfoScraping().then(() =>{
    console.log(results.length);

    let data = JSON.stringify(results);  
    fs.writeFileSync('results.json', data); 
} )}
);

async function detailedCompanyInfoScraping(){
    for (j = 0; j < companytoList.length; j++){
        console.log('http://www.techinfrance.fr' + companytoList[j]);
        await getDataForASingleCompany('http://www.techinfrance.fr', companytoList[j], j)
        await sleep(3000);
    } 
} 
async function mainScraping() { 
    for(i = 1; i <= 2; i++){ // 34 is the max
        console.log(url + i);
        await getDataForCompanies(url + i);
        await sleep(2000);
    }
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function getDataForCompanies (url) {
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

async function getDataForASingleCompany (url, company, j) {
    await axios.get(url + company)
    .then((response) => {
        if(response.status === 200) {
            html = response.data;
            $ = cheerio.load(html); 

            let companyUrl = '';
            let email = '';
            let address = '';
            let contact = '';
            let tel = '';

            if ($('a[class="btn btn-dark btn-large"]').text() == "Voir le site"){
                companyUrl = $('a[class="btn btn-dark btn-large"]').attr('href');
                console.log(companyUrl);
            } ;
            address = $('p', 'div[class="box box-adress"]').text();
            contact = $('span[class="contact-name"]', 'div[class="box box-adress"]').text(); // contact-name
            tel = $('span[class="tel"]', 'div[class="box box-adress"]').text();
            
            $('script', 'div[class="box box-adress"]').each(function(i, elem) {
            
                console.log($(this).contents()[0].data);
                let document = new documentFaker();
                eval($(this).contents()[0].data);
                console.log(document.read());
            
                let emailHtml = cheerio.load(document.read());
                email = emailHtml.text();
              });
            
            result = {
                j,
                company,
                companyUrl,
                email,
                address,
                contact,
                tel
            } 
            console.log(result);
            results.push(result);
        }
    }, 
        (error) => console.log(error)
    );
} 
