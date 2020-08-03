interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  // HTML page
  file: string;
  // dynamic data (e.g., user name)
  variables: ITemplateVariables;
}

export default IParseMailTemplateDTO;
