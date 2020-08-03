import IMailTemplateProvider from '../models/IMailTemplateProvider';
//import IParseMailTemplateDTO from '../dtos/IParseMailtemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Fake mail template';
  }
}

export default FakeMailTemplateProvider;
