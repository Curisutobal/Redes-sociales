import fs from "fs"


async function main() {
    const result = await fetch("https://apps.lider.cl/supermercado/bff/category", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "es-ES,es;q=0.9",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "tenant": "supermercado",
          "x-channel": "SOD",
          "x-flowid": "4039acd0-7c43-4ad9-b80a-c2dc0f6484ab",
          "x-sessionid": "57f442e6-58bb-4aaf-a9b8-285d26270f23",
          "cookie": "dtCookie=v_4_srv_-2D4529_sn_TL3PFQ0TMFTVKH4INOP5LTSR6BJGCEMM; rxVisitor=1744818696426CO0A81K3SRLB0BHO9V50URT640227LK1; dtSa=-; _gcl_au=1.1.514680559.1744818697; _ga=GA1.1.658019200.1744818697; vtc=b1Y1kIj0BNBPhKigCyhCKE; bstc=b1Y1kIj0BNBPhKigCyhCKE; xpa=_IdPf; exp-ck=_IdPf1; pxcts=ad98d3db-1ada-11f0-8554-1e9cea716c84; _pxvid=ad98c7a3-1ada-11f0-8553-86a3f1059e5a; _fbp=fb.1.1744818697918.176890299585652588; _tt_enable_cookie=1; _ttp=01JRZMRXQTVFQDNTP06SEV3RD0_.tt.1; __pxvid=ae20ec06-1ada-11f0-bc3d-a6e33947e12f; xpm=1%2B1744818696%2Bb1Y1kIj0BNBPhKigCyhCKE~%2B1; _ga_9FZFY51HX9=GS1.1.1744818722.1.0.1744818722.0.0.0; _ga_LT7B42QQTE=GS1.1.1744818696.1.1.1744818758.0.0.0; _ga_835TB8N4KP=GS1.1.1744818696.1.1.1744818758.60.0.0; _ga_S5V4J9JZ4W=GS1.1.1744818696.1.1.1744818758.60.0.0; _uetsid=ae6c47401ada11f092557fa22ff1f406; _uetvid=ae6c60501ada11f0a18c1990bea1faba; ttcsid=1744818697981.1.1744818758887; fs_lua=1.1744818758847; fs_uid=#16PCMB#bfcc335c-89be-4ebe-907a-84dc87dc8610:ab5cc78a-1b73-4cf2-b1b8-61f534970bbf:1744818697326::2#/1776354701; ttcsid_CC91B3JC77U0P3N58T6G=1744818697981.1.1744818759185; _px3=63e6fcc601f08f730b2fea0273db942cc1045d288b35bb96299f89e8a510ca04:vYVvBKpCMfGwCEfkzhvz1e6LEXm62p4F89ENcIzsK0RHLSAJFz6g7y+SqyEeFapoRQX20/1C/Cc3N7ysSxSZfQ==:1000:Wsne1HRjqEWHikBwD24x7MsZmYLPbFOGM7pOsvLj+9dyA/T/aKoWGUaG3L/8QS1dy6tFmyUj/soaJApvtdVtW+cDUNYkpuT3b9NUweUxYL3QZDI/C1NzuTchlHHjcRmPycVREh8pdcs5csARNVWgYtzRpUpIR9Boz0KUSdz4WBYYEr4Tad/FREdrY97xL4nz7UoStmBYvjKfGs0RkHb04hiC3twtme+P1k+P5zNKR8U=; TS01cc7ea9=0140bf8a7484d5e9988fa13228822c1aea063ad8ad8133db5bd7341fe242043bf344355625d3ea3c984091b260d798073c1d71e88c; TSe3289311027=0844835392ab20001eccf7b32dbc8259e5af001779d49754341cb8140a1ee841f526b4f5da4f36d108af6a80b7113000eb284f84c087a2846793cb7069d5c03cf52fbbd87e5e8fa669ab620a62643864dac01f0f8c8f80b400c687f9e07f81f9; _ga_PNF51KE2NM=GS1.1.1744818697.1.1.1744818762.60.0.0; TS017e8d10=01fd773220dee3d23e1106aa3425ed5fa1a4ec611a295f7a951a637b54d8880aa4b63dadbe9dab1dcea47895849e0c7a7ba55acf37; TS01fffdff=01fd773220dee3d23e1106aa3425ed5fa1a4ec611a295f7a951a637b54d8880aa4b63dadbe9dab1dcea47895849e0c7a7ba55acf37; rxvt=1744820565637|1744818696427; dtPC=-4529$18758173_914h32vFUUCMAHLWTPUWKAFOCKKUNRUVRFIMRNG-0e0",
          "Referer": "https://www.lider.cl/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"categories\":\"Frescos y Lácteos/Leche\",\"page\":1,\"facets\":[],\"sortBy\":\"\",\"hitsPerPage\":16}",
        "method": "POST"
      });

      const liderLeches = await result.json();
      fs.writeFileSync("result.json", JSON.stringify(liderLeches));
}


(async() => await main())();