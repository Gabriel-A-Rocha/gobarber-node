// interface to enforce these are the only options allowed
interface IMailConfig {
  driver: 'ethereal' | 'ses';
}

export default {
  driver: process.env.MAIL_DRIVER,
} as IMailConfig;
