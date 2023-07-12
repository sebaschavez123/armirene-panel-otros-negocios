import { environment } from '../environments/environment';

const configuration: any = {
  backend: environment.gateway,
  countryName: environment.countryName,
  isColombia: environment.isColombia,
  isVenezuela: environment.isVenezuela,
  // backend3: environment.gateway30,
  // antifraud: environment.gateway30Antifraud,
  // dashboard: environment.gateway30Dashboard,
  // reports: environment.gateway30Reports,
  // firebase: environment.gatewayFirebase,
  // sas: environment.gateway30SAS,
  // sb: environment.gatewaySB,
  // firebaseConfig: environment.firebaseConfig,
  // indicator: environment.indicator,
  // currency: environment.currency,
  // cctld: environment.cctld,
  // phoneCode: environment.isColombia ? '57':'58',
  // coordinates: environment.coordinates,
  // payments: environment.payments,
  // zendesk: environment.zendesk,
};

export {configuration as countryConfig};
