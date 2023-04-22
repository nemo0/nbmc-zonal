import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import sendEmail from '@/lib/sendMail';

import { IIndividualCamper } from '@/components/Partials/IndividualForm';

const supabaseUrl = process.env.SUPABASE_DB_URL || '';
const supabaseKey = process.env.SUPABASE_DB_PROJECT_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const __dirname = process.cwd();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    organizationName,
    organizationAddress,
    organizationContact,
    organizationEmail,
    organizationContactPerson,
    campers,
  } = req.body;

  const campersWithOrganization = campers.map((camper: IIndividualCamper) => {
    return {
      organizationName,
      organizationAddress,
      organizationContact,
      organizationEmail,
      organizationContactPerson,
      ...camper,
    };
  });

  const { data, error } = await supabase
    .from('organization')
    .insert(campersWithOrganization);

  if (error) {
    return res.status(400).json({ error: error.message, success: false });
  }

  const camper = {
    organizationName,
    organizationAddress,
    organizationContact,
    organizationEmail,
    organizationContactPerson,
    campers,
  };

  sendEmail(
    organizationEmail,
    'Organization Registration',
    camper,
    `${__dirname}/src/templates/organization.ejs`
  );
  return res.status(200).json({ data, success: true });
}
