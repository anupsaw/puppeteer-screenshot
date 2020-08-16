
import { Page } from 'puppeteer/lib/cjs/puppeteer/common/Page'
import { JSHandle, ElementHandle } from 'puppeteer/lib/cjs/puppeteer/common/JSHandle'
import { ScriptTagOptions } from 'puppeteer';
import * as puppeteer from 'puppeteer';
import { SzImageDocument } from './docs';
import * as fs from 'fs';
import * as path from 'path';

export class SzPuppeteerPageProxy {
    private static isProxyDone: boolean = false;
    private static counter = 0;

    private promiseObj: any = {}
    constructor() {
        if (!SzPuppeteerPageProxy.isProxyDone) {
            this.applyProxy(Page);
            this.applyProxy(JSHandle);
            this.applyProxy(ElementHandle);
            SzPuppeteerPageProxy.isProxyDone = true;
        }
    }
    public static register(): SzPuppeteerPageProxy {
        return new SzPuppeteerPageProxy();
    }

    private pause(): void {
        this.promiseObj.promise = new Promise((r, rj) => {
            this.promiseObj.resolve = r;
            this.promiseObj.reject = rj;
        });
    }

    private resume(): void {
        this.promiseObj.resolve();
        this.promiseObj.promise = null;
        this.promiseObj.resolve = null;
        this.promiseObj.reject = null;
    }

    private applyProxy(pageConstructor?: any, name?: string): void {

        const page = pageConstructor.prototype;;
        const excludeKeys = ['constructor'];
        for (const key of Object.getOwnPropertyNames(page)) {

            if ((key.startsWith('wait') || key.startsWith('$')) && typeof page[key] === 'function' && excludeKeys.indexOf(key) === -1) {
                const waitFun = page[key];
                console.log('proxy done for', key);
                const promiseObj = this.promiseObj;
                page[key] = async function (...args: any) {
                    await promiseObj.promise || Promise.resolve();
                    return waitFun.apply(this, args);
                }
            }
        }
    }

    public async init(page: puppeteer.Page, config: Partial<SzPageScreenshotConfig> = {}): Promise<any> {

        config = new SzPageScreenshotConfig(config);
        let docInstance: SzImageDocument;
        if (config.attacheImagesToDoc) {
            docInstance = new SzImageDocument(page, config);
        }
        const tags: ScriptTagOptions = { path: path.join(__dirname + '/client/bundle.js') };
        await page.addScriptTag(tags);
        await page.evaluate(() => {
            const tag = document.createElement('div');
            tag.innerHTML = '<sz-puppeteer-action-button></sz-puppeteer-action-button>';
            document.body.appendChild(tag);
        });

        await page.exposeFunction('onPuppeteerScreenshot', async (val: any) => {
            console.log('test', val)
            !fs.existsSync(config.imageSavePath) && fs.mkdirSync(config.imageSavePath, { recursive: true });
            const imgBuffer = await page.screenshot({ path: `${config.imageSavePath}/image-${SzPuppeteerPageProxy.counter++}.png`, clip: val });
            docInstance && docInstance.addImage(imgBuffer);
        });

        await page.exposeFunction('onPuppeteerPauseExecution', async () => {
            console.log('Automated Execution is Paused');
            console.log('waiting to resume the execution ...');
            this.pause();
            return Promise.resolve();
        });
        await page.exposeFunction('onPuppeteerResumeExecution', async () => {
            console.log('Automated Execution is Resumed.');
            this.resume();
            return Promise.resolve();
        });
    }
}

export class SzPageScreenshotConfig {

    imageSavePath?: string = 'screenshots';
    docSavePath?: string = 'screenshots/docs'
    attacheImagesToDoc?: boolean = true;
    saveImage?: boolean = true;
    docName?: string = 'image-doc'

    constructor(obj: Partial<SzPageScreenshotConfig> = {}) {

        for (const key in obj) {
            if (key && this.hasOwnProperty(key)) {
                this[key] = obj[key];
            }
        }
    }
}

