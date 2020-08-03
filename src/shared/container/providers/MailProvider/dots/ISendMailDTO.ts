import IParseMailtemplateDTO from '../../MailTemplateProvider/dtos/IParseMailtemplateDTO';
import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailtemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export default ISendMailDTO;
