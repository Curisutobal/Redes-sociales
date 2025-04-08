import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { json } from 'stream/consumers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));



(async() => {

    const result = await fetch("https://www.unimarc.cl/_next/data/QoB02u7RYdXx1mw6Ycwkp/ofertas/a-luca-mil.json?page=2&offers=a-luca-mil", {
        "headers": {
          "accept": "*/*",
          "accept-language": "es-ES,es;q=0.9",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-nextjs-data": "1",
          "cookie": "searchValue=; sessionNanoId=njU7hY1TvUyTgyiLQbT1l; sessionAnonymousId=zM4RO866rSbAFGZigiIrI; mx-ga4-ecom-list=; mx-ga4-promo-list=; mx-ga4-url-promo-list=; mx-ga4-items-promos-list=; _ga=GA1.1.390615693.1744129515; _tt_enable_cookie=1; _ttp=01JRB3GQPENGXZ0XAH71WH4Z1C_.tt.1; _fbp=fb.1.1744129515691.31469384884717683; dtCookie=v_4_srv_6_sn_E56E23AB5C94812C0C61EB706EACC303_perc_100000_ol_0_mul_1_app-3A342883faf8721018_0_app-3Aea7c4b59f27d43eb_1; _gcl_au=1.1.24110898.1744129516; _clck=1k1v8o1%7C2%7Cfuw%7C0%7C1924; _cc_id=f938a46c047912daa4ad34650ed30cbf; _hjSessionUser_2255287=eyJpZCI6ImVkZjNiZTZhLTdiNTMtNWNhZS04MDJiLWQ1Yjk3NDE2YjhhNCIsImNyZWF0ZWQiOjE3NDQxMjk1MTU3MjgsImV4aXN0aW5nIjp0cnVlfQ==; panoramaId=1e662a0b913809164dc078848982a9fb927ab0b16b696a6f873687d921589383; panoramaIdType=panoDevice; promotionalModal=true; _hjSession_2255287=eyJpZCI6IjFlNzhjODJlLTFlYTUtNDgyNy05MzZmLTQ1M2Q5NzdjOWU5MCIsImMiOjE3NDQxMzQxNjU5MTYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; ttcsid=1744134166025.2.1744134792637; ttcsid_C59PC37GE0M9N03GVKQ0=1744134166024.2.1744134792982; _clsk=o6yju%7C1744134793395%7C8%7C1%7Cn.clarity.ms%2Fcollect; panoramaId_expiry=1744221193644; _ga_HP7650L1SD=GS1.1.1744134158.2.1.1744135192.60.0.2089714065",
          "Referer": "https://www.unimarc.cl/ofertas/a-luca-mil?page=2",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
    
      
    

    const json = await result.json();
    console.log(json)
    
})();





app.get('/unimarc', async(req, res) => {
    const result = await fetch("https://www.unimarc.cl/_next/data/QoB02u7RYdXx1mw6Ycwkp/ofertas/a-luca-mil.json?page=2&offers=a-luca-mil", {
        "headers": {
          "accept": "*/*",
          "accept-language": "es-ES,es;q=0.9",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-nextjs-data": "1",
          "cookie": "searchValue=; sessionNanoId=njU7hY1TvUyTgyiLQbT1l; sessionAnonymousId=zM4RO866rSbAFGZigiIrI; mx-ga4-ecom-list=; mx-ga4-promo-list=; mx-ga4-url-promo-list=; mx-ga4-items-promos-list=; _ga=GA1.1.390615693.1744129515; _tt_enable_cookie=1; _ttp=01JRB3GQPENGXZ0XAH71WH4Z1C_.tt.1; _fbp=fb.1.1744129515691.31469384884717683; dtCookie=v_4_srv_6_sn_E56E23AB5C94812C0C61EB706EACC303_perc_100000_ol_0_mul_1_app-3A342883faf8721018_0_app-3Aea7c4b59f27d43eb_1; _gcl_au=1.1.24110898.1744129516; _clck=1k1v8o1%7C2%7Cfuw%7C0%7C1924; _cc_id=f938a46c047912daa4ad34650ed30cbf; _hjSessionUser_2255287=eyJpZCI6ImVkZjNiZTZhLTdiNTMtNWNhZS04MDJiLWQ1Yjk3NDE2YjhhNCIsImNyZWF0ZWQiOjE3NDQxMjk1MTU3MjgsImV4aXN0aW5nIjp0cnVlfQ==; panoramaId=1e662a0b913809164dc078848982a9fb927ab0b16b696a6f873687d921589383; panoramaIdType=panoDevice; promotionalModal=true; _hjSession_2255287=eyJpZCI6IjFlNzhjODJlLTFlYTUtNDgyNy05MzZmLTQ1M2Q5NzdjOWU5MCIsImMiOjE3NDQxMzQxNjU5MTYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; ttcsid=1744134166025.2.1744134792637; ttcsid_C59PC37GE0M9N03GVKQ0=1744134166024.2.1744134792982; _clsk=o6yju%7C1744134793395%7C8%7C1%7Cn.clarity.ms%2Fcollect; panoramaId_expiry=1744221193644; _ga_HP7650L1SD=GS1.1.1744134158.2.1.1744135192.60.0.2089714065",
          "Referer": "https://www.unimarc.cl/ofertas/a-luca-mil?page=2",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
    
      
    

    const json = await result.json();
    res.json(json);
});


app.get('/unimarc2', async(req, res) => {
    const result = await fetch("https://www.unimarc.cl/_next/data/QoB02u7RYdXx1mw6Ycwkp/ofertas/a-luca.json?page=16&offers=a-luca", {
        "headers": {
          "accept": "*/*",
          "accept-language": "es-ES,es;q=0.9",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-nextjs-data": "1",
          "cookie": "searchValue=; sessionNanoId=njU7hY1TvUyTgyiLQbT1l; sessionAnonymousId=zM4RO866rSbAFGZigiIrI; mx-ga4-ecom-list=; mx-ga4-promo-list=; mx-ga4-url-promo-list=; mx-ga4-items-promos-list=; _ga=GA1.1.390615693.1744129515; _tt_enable_cookie=1; _ttp=01JRB3GQPENGXZ0XAH71WH4Z1C_.tt.1; _fbp=fb.1.1744129515691.31469384884717683; dtCookie=v_4_srv_6_sn_E56E23AB5C94812C0C61EB706EACC303_perc_100000_ol_0_mul_1_app-3A342883faf8721018_0_app-3Aea7c4b59f27d43eb_1; _gcl_au=1.1.24110898.1744129516; _clck=1k1v8o1%7C2%7Cfuw%7C0%7C1924; _cc_id=f938a46c047912daa4ad34650ed30cbf; _hjSessionUser_2255287=eyJpZCI6ImVkZjNiZTZhLTdiNTMtNWNhZS04MDJiLWQ1Yjk3NDE2YjhhNCIsImNyZWF0ZWQiOjE3NDQxMjk1MTU3MjgsImV4aXN0aW5nIjp0cnVlfQ==; panoramaId=1e662a0b913809164dc078848982a9fb927ab0b16b696a6f873687d921589383; panoramaIdType=panoDevice; promotionalModal=true; _hjSession_2255287=eyJpZCI6IjFlNzhjODJlLTFlYTUtNDgyNy05MzZmLTQ1M2Q5NzdjOWU5MCIsImMiOjE3NDQxMzQxNjU5MTYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MX0=; panoramaId_expiry=1744222187086; ttcsid=1744134166025.2.1744135802362; ttcsid_C59PC37GE0M9N03GVKQ0=1744134166024.2.1744135802581; _clsk=o6yju%7C1744135802804%7C12%7C1%7Cn.clarity.ms%2Fcollect; _ga_HP7650L1SD=GS1.1.1744134158.2.1.1744135818.27.0.2089714065",
          "Referer": "https://www.unimarc.cl/ofertas/a-luca?page=16",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      
    
      
    

    const json = await result.json();
    res.json(json);
});



app.get('/csr', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/csr.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
