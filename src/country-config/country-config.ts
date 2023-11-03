import { environment } from '../environments/environment';

const configuration: any = {
  backend: environment.gateway,
  countryName: environment.countryName,
  isColombia: environment.isColombia,
  isVenezuela: environment.isVenezuela,
  phoneSize: environment.phoneSize,
  countryCode : environment.countryCode
};

export { configuration as countryConfig };
