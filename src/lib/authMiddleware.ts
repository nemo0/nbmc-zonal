import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  viewAllIndividual: '/individual/read',
  viewAllOrganization: '/organization/read',
  editIndividual: '/individual/edit',
  editOrganization: '/organization/edit',
  export: '/export',
};
