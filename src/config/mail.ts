// interface to enforce these are the only options allowed
interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'contact@gabrielrocha.dev',
      name: 'Gabriel Rocha',
    },
  },
} as IMailConfig;
