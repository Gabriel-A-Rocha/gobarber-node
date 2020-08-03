import ISendMailDTO from '@shared/container/providers/MailProvider/dots/ISendMailDTO';

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
