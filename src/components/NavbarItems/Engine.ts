import { buildSearchEngine, getOrganizationEndpoints } from '@coveo/headless';

interface ITokenData {
  token?: string;
  orgId?: string;
  expiry?: number;
}

const getCoveoToken = async () => {
  const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
  try {
    const response = await fetch(rootUrl + '/api/coveo_api');
    const data = await response.json();

    const item = {
      token: data.token,
      orgId: data.id,
      expiry: Date.now() + 12 * 60 * 60 * 1000, // 12hrs from now
      // expiry: Date.now() + 900000, // 12hrs from now
    };
    localStorage.setItem('coveo_token', JSON.stringify(item));
    return item;
  } catch (error) {
    console.error('Error fetching Coveo token:', error);
    return {};
  }
};
async function InitializeCoveo() {
  let tokenData: ITokenData | null = null;
  const storedToken = localStorage.getItem('coveo_token');
  if (storedToken) {
    const data = JSON.parse(storedToken) as ITokenData;
    if (data.expiry && data.expiry <= Date.now()) {
      tokenData = await getCoveoToken();
    } else {
      tokenData = data;
    }
  } else {
    tokenData = await getCoveoToken();
  }

  try {
    const engine = buildSearchEngine({
      configuration: {
        organizationId: tokenData?.orgId || '',
        accessToken: tokenData?.token || '',
        organizationEndpoints: getOrganizationEndpoints(tokenData?.orgId || ''),
      },
    });

    return engine;
  } catch (error) {
    return null;
  }
}

export default InitializeCoveo;
