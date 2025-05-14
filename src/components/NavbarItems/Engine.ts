import { buildSearchEngine, getOrganizationEndpoints } from '@coveo/headless';

interface ITokenData {
  token?: string;
  orgId?: string;
  expiry?: number;
}
export const isTokenExpired = (): boolean => {
  const storedToken = localStorage.getItem('coveo_token');
  const data = JSON.parse(storedToken);
  if (data && data.expiry) {
    return data.expiry <= Date.now();
  }
  return true;
};
const getCoveoToken = async () => {
  const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
  try {
    const response = await fetch(rootUrl + '/api/coveo_api');
    const data = await response.json();

    const item = {
      token: data.token,
      orgId: data.id,
      expiry: Date.now() + 13 * 60 * 1000, // 13 mins from now
      // expiry: Date.now() + 11 * 60 * 60 * 1000 + 5 * 60 * 1000, // 11hrs 55 mins from now
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
    if (isTokenExpired()) {
      tokenData = await getCoveoToken();
    } else {
      tokenData = JSON.parse(storedToken) as ITokenData;
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
