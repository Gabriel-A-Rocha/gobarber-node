import IParseMailtemplateDTO from '../dtos/IParseMailtemplateDTO';

interface IMailTemplateProvider {
  // assembles the email with the provided info
  parse(data: IParseMailtemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
