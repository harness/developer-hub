import { buildSearchEngine } from '@coveo/headless';

const buildEngine = buildSearchEngine({
  configuration: {
    organizationId: 'harnessproductionp9tivsqy',
    accessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJzZWFyY2hIdWIiOiJXZWJzaXRlU2VhcmNoIiwidjgiOnRydWUsInRva2VuSWQiOiJyYWRheDQ2ZDd4NGJ2ZDNuNWVsaWMyMmFoNCIsIm9yZ2FuaXphdGlvbiI6Imhhcm5lc3Nwcm9kdWN0aW9ucDl0aXZzcXkiLCJ1c2VySWRzIjpbeyJ0eXBlIjoiVXNlciIsIm5hbWUiOiJndWVzdCIsInByb3ZpZGVyIjoiRW1haWwgU2VjdXJpdHkgUHJvdmlkZXIifV0sInJvbGVzIjpbInF1ZXJ5RXhlY3V0b3IiXSwiaXNzIjoiU2VhcmNoQXBpIiwiZXhwIjoxNzM1NTMyNjIwLCJpYXQiOjE3MzU0ODk0MjB9.FeU_w6J2N9CnsT1JC3wcQ4nD90W4Xs4Skj_7vKH1usE',
  },
});

export default buildEngine;

// async function main() {
//   const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
//   try {
//     const response = await fetch(rootUrl + '/api/coveo_api');
//     const data = await response.json();
//     const item = {
//       token: data.token,
//       orgId: data.id,
//     };

//     const buildEngine = buildSearchEngine({
//       configuration: {
//         organizationId: 'harnessproductionp9tivsqy',
//         accessToken: 'data.token',
//       },
//     });
//     return item;
//   } catch (error) {
//     console.error('Error fetching Coveo token:', error);
//   }
// }
