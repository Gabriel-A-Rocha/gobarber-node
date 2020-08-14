import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dots/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { template } from 'handlebars';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    subject,
    from,
    to,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log('Funcionou');
  }
}

export default SESMailProvider;
