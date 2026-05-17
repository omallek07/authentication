export const mapUrlToPermission = (route: IRoutePayload) => {
  const actionMap = {
    GET: 'VIEW',
    POST: 'CREATE',
    PUT: 'UPDATE',
    PATCH: 'EDIT',
    DELETE: 'DELETE'
  };

  let result = actionMap[route.method];

  // POST auth/signup => CREATE_AUTH_SIGNUP
  const routeSegments = route.path.split('/').filter(Boolean);
  for (const segment of routeSegments) {
    const segmentUpperCase = segment.toUpperCase().replace(/:/g, '').replace(/-/g, '_'); // Remove ':' from route parameters
    result += `_${segmentUpperCase}`;
  }

  return result;
};
