import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

const listitemPages = [
  {
    url: 'https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml',
    query: '.li_box01 a',
    domain: '事业单位招聘-成都市人力资源和社会保障局',
  },
  {
    url: 'https://ntce.neea.edu.cn/html1/category/1507/1148-1.htm',
    query: '#first_data a',
    domain: '中国教育考试网-中小学教师资格考试',
  },
];

export async function getNeeaListItem() {
  const url = 'https://ntce.neea.edu.cn/html1/category/1507/1148-1.htm';
  const query = '#first_data a';
  const domain = '中国教育考试网-中小学教师资格考试';

  const u = new URL(url);
  const req = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Referer: url,
      Host: u.host
    }
  });
  const t = await req.text();

  const $ = cheerio.load(t);
  const links = $(query);

  const res = [];

  links.each((index, element) => {
    const href = $(element).attr('href');
    const title = $(element).text();
    res.push({
      href: `${u.origin}${href}`,
      title,
      domain,
    });
  });

  return res;
}

export async function getCdhrssChengduListItem() {
  const url = 'https://cdhrss.chengdu.gov.cn/cdrsj/c151971/sydwzp.shtml';
  const query = '.li_box01 a';
  const domain = '事业单位招聘-成都市人力资源和社会保障局';

  const u = new URL(url);
  const req1 = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Referer: url,
      Host: u.host
    }
  });
  const t = await req1.text();
  const headers = req1.headers;
  const setCookies = headers.get('Set-Cookie');
  const [cookie] = setCookies.split(';');

  const js = new JSDOM(`${t}></head><body></body></html>`, {
    resources: 'usable',
    runScripts: 'dangerously'
  });
  console.log();

  // const req = await fetch(url, {
  //   headers: {
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  //     Referer: url,
  //     Host: u.host,
  //     Cookie: cookie
  //   }
  // });

  // const t = await req.text();
  // console.log();
  // const $ = cheerio.load(t);
  // const links = $(query);

  // const res = [];

  // links.each((index, element) => {
  //   const href = $(element).attr('href');
  //   const title = $(element).text();
  //   res.push({
  //     href: `${u.origin}${href}`,
  //     title,
  //     domain,
  //   });
  // });

  // return res;
}

getCdhrssChengduListItem();
