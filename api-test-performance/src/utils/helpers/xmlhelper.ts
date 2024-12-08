import { XMLParser } from "fast-xml-parser";

export class XmlHelper {
  private static parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
  });

  public static parseXmlToObject<T>(xmlString: string): T {
    return this.parser.parse(xmlString);
  }

  public static async parseXmlResponse<T>(response: Response): Promise<T> {
    const xmlString = await response.text();
    return this.parseXmlToObject<T>(xmlString);
  }
}
