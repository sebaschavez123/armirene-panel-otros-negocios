export const environment = {
  production: false,
  hmr: false,
  gateway:            'https://monitor-dot-oracle-services-vzla.uc.r.appspot.com/_ah/api',// Backend 2.0
  gateway30:          'https://monitor30-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/monitor', // Backend 3.0
  gateway30Antifraud: 'https://antifraud-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/antifraud', // Antifraude
  gateway30Dashboard: 'https://monitor30-dashboard-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/monitor', // DASHBOARD
  gateway30Reports:   'https://monitor30-reports-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/monitor', // Reports
  gatewayFirebase:    'https://sturdy-spanner-212219.firebaseio.com/appMensajerosQA', // PROD PROVISIONAL
  gateway30SAS:       'https://sas-v30-dot-stunning-base-164402.appspot.com',
  gatewaySB:          'https://oracle-services-vzla.uc.r.appspot.com/_ah/api',
  payments:           'https://payments-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v1/payments',
  zendesk:            'https://zendesk-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/zendesk',
  firebaseConfig: {
    apiKey: "AIzaSyCfrP99HvpCWenYVI3-7d3yxYz-OTwDS7w",
    authDomain: "oracle-services-vzla.firebaseapp.com",
    databaseURL: 'https://oracle-services-vzla-scan-and-go.firebaseio.com/',
    projectId: "oracle-services-vzla",
    storageBucket: "oracle-services-vzla.appspot.com",
    messagingSenderId: "1071850495527",
    appId: "1:1071850495527:web:94c052306a96675a0f7802"
  },
  // no modificar
  countryName: 'Venezuela',
  indicator: 'VEN',
  isVenezuela: true,
  isColombia: false,
  currency: 'VEF',
  cctld: 've',
  coordinates: [10.4696, -66.8037]
}
