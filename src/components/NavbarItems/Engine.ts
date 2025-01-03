import { buildSearchEngine, getOrganizationEndpoints } from '@coveo/headless';

interface ITokenData {
  token?: string;
  orgId?: string;
  expiry?: number;
}

async function InitializeCoveo() {
  let tokenData: ITokenData = {};
  const getCoveoToken = async () => {
    const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
    try {
      const response = await fetch(rootUrl + '/api/coveo_api');
      const data = await response.json();

      const item = {
        token: data.token,
        orgId: data.id,
        expiry: Date.now() + 12 * 60 * 60 * 1000, // 12hrs from now
      };
      localStorage.setItem('coveo_token', JSON.stringify(item));
      return item;
    } catch (error) {
      console.error('Error fetching Coveo token:', error);
      return {};
    }
  };

  const storedToken = localStorage.getItem('coveo_token');
  if (storedToken) {
    const data = JSON.parse(storedToken);
    if (data.expiry <= Date.now()) {
      tokenData = await getCoveoToken();
    } else {
      tokenData = data;
    }
  } else {
    tokenData = await getCoveoToken();
  }

  const engine = buildSearchEngine({
    configuration: {
      organizationId: tokenData?.orgId || '',
      accessToken: tokenData?.token || '',
      organizationEndpoints: getOrganizationEndpoints(tokenData?.orgId || ''),
    },
  });

  return engine;
}

export default InitializeCoveo;
