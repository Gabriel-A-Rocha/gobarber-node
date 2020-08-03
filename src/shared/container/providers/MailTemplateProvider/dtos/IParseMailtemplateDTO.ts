interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  // HTML page
  template: string;
  // dynamic data (e.g., user name)
  variables: ITemplateVariables;
}

export default IParseMailTemplateDTO;
