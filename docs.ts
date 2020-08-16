
import { Document, Media, Packer, Paragraph, Header, PageNumberFormat, PictureRun, PageNumber } from 'docx';
import * as fs from 'fs';
import { SzPageScreenshotConfig } from './snapshot';
import { Page } from 'puppeteer';
export class SzImageDocument {
    private hasValue: boolean;
    private location: string;
    private docInstance: Document = new Document();
    private docName: string;

    constructor(page: Page, config: SzPageScreenshotConfig = new SzPageScreenshotConfig()) {
        page.on('close', () => {
            this.compile();
        })
        this.setLocation(config.docSavePath);
        this.setDocName(config.docName);

    }

    public addImage(image: Buffer, heading: string = ''): void {
        const size = this.getPNGSize(image);
        const imageMedia = Media.addImage(this.docInstance, image, size.width, size.height);
        this.addSection(imageMedia, heading);
        this.hasValue = true;
    }

    public addSection(imageMedia: PictureRun, heading: string = ''): void {

        this.docInstance.addSection({
            headers: {
                default: new Header({
                    children: [new Paragraph(heading || 'Unknown')]
                }),
            },
            properties: {
                pageNumberStart: 1,
                pageNumberFormatType: PageNumberFormat.DECIMAL
            },
            children: [new Paragraph(imageMedia)]
        });

    }

    public compile(docName?: string): void {
        this.setDocName(docName);
        if (this.hasValue) {
            this.docName = this.docName || 'image-doc.docx';
            const name = this.location ? `${this.location}/${this.docName}` : this.docName;
            Packer.toBuffer(this.docInstance).then((buffer: Buffer) => {
                console.log(name);
                fs.writeFileSync(name, buffer);
            });
            this.init();
        }

    }

    public init(docName?: string): SzImageDocument {

        this.docName = '';
        console.log('name set', docName);
        this.docInstance = new Document();
        this.setDocName(docName);
        // this.setLocation(location);
        return this;
    }

    public setDocName(name?: string): SzImageDocument {
        this.docName = name && `${name}.docx` || this.docName;
        return this;
    }

    public setLocation(location?: string): SzImageDocument {
        if (location) {
            !fs.existsSync(location) && fs.mkdirSync(location, { recursive: true });
            this.location = location;
        }
        return this;
    }

    private getPNGSize(buffer: Buffer): { width: number, height: number } {
        const maxWidth = 600;
        let size: { width: number, height: number };

        const setSize = (w: number, h: number) => ({ width: buffer.readUInt32BE(w), height: buffer.readUInt32BE(h) });
        size = buffer.toString('ascii', 12, 16) === 'CgBI' ? setSize(32, 36) : setSize(16, 20);
        if (size.width > maxWidth) {
            size.height = size.height / (size.width / maxWidth);
            size.width = maxWidth;
        }
        return size;
    }
}