import * as puppeteer from 'puppeteer';
import { SzPuppeteerPageProxy } from './snapshot';
let counter = 0;

function applyProxy(pageConstructor?: any, name?: string): any {

    const page = pageConstructor.prototype;;
    const excludeKeys = ['constructor'];

    const promiseObj: any = {}
    const pause = function () {
        promiseObj.promise = new Promise((r, rj) => {
            promiseObj.resolve = r;
            promiseObj.reject = rj;
        });
    }

    const resume = function () {
        promiseObj.resolve();
    }

    for (const key of Object.getOwnPropertyNames(page)) {

        if ((key.startsWith('wait') || key.startsWith('$')) && typeof page[key] === 'function' && excludeKeys.indexOf(key) === -1) {
            const waitFun = page[key];
            console.log('proxy done for', key);
            page[key] = async function (...args: any) {
                await promiseObj.promise;
                return waitFun.apply(this, args);
            }
        }
    }

    return { pause, resume };

}




(async () => {

    const pObj = SzPuppeteerPageProxy.register();


    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, devtools: true });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/', { waitUntil: 'networkidle0' });
    await pObj.init(page, { imageSavePath: 'image', docName:'page1' });

    for (let index = 0; index < 100; index++) {
        await page.waitFor(1000);
        console.log(`waited for ${index}`);
    }


    // await page.evaluate(() => {
    //     (window as any).exStatus({ x: 48, y: 150, width: 660, height: 350 });
    // });
    // await browser.close();
})()