import { NextApiRequest, NextApiResponse } from 'next';

import sendEmail from '@/lib/sendMail';
import { supabaseServer } from '@/lib/supabaseServer';

import { IIndividualCamper } from '@/components/Partials/IndividualForm';

const __dirname = process.cwd();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    const { data, error } = await supabaseServer
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
  } catch (error) {
    return res.status(400).json({ error: error, success: false });
  }
}
