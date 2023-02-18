import { Environment } from 'src/environments/environment.interface';

export const environment: Environment = {
  production: true,
  firebase: {
    projectId: 'nutrition-d7970',
    appId: '1:856681086085:web:aac95852b7fa9170cdbdec',
    databaseURL:
      'https://nutrition-d7970-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'nutrition-d7970.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyA-gewSHjPEaVw5TeQORMNqtiD1iXdxYnQ',
    authDomain: 'nutrition-d7970.firebaseapp.com',
    messagingSenderId: '856681086085',
  },
  nutritionix: {
    id: '505ea1f5',
    key: 'a8654bc1f5d68ed03f8e3ae59cb6aa25',
    url: `https://trackapi.nutritionix.com/v2`,
  },
};
