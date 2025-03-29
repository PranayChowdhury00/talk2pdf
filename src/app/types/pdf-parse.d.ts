declare module 'pdf-parse/lib/pdf-parse.js' {
    import { Options, Result } from 'pdf-parse';
    const PdfParse: (dataBuffer: Buffer | ArrayBuffer, options?: Options) => Promise<Result>;
    export default PdfParse;
  }