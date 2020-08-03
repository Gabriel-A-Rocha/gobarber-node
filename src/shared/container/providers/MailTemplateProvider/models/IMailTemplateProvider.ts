import IParseMailtemplateDTO from '../dtos/IParseMailtemplateDTO';

interface IMailTemplateProvider {
  parse(data: IParseMailtemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
