import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { IIndividualCamper } from '@/components/Partials/IndividualForm';

const supabaseUrl = process.env.SUPABASE_DB_URL || '';
const supabaseKey = process.env.SUPABASE_DB_PROJECT_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface IOrganizationCamper extends IIndividualCamper {
  id: string;
  organizationName: string;
  organizationAddress: string;
  organizationContact: string;
  organizationEmail: string;
  organizationContactPerson: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      id,
      organizationName,
      organizationAddress,
      organizationContact,
      organizationEmail,
      organizationContactPerson,
      name,
      guardian,
      address,
      age,
      occupation,
      contact,
      email,
      physicallyFit,
      religion,
      foodPreference,
      campExperience,
      natureOfCamper,
      amount,
    } = req.body;

    const { data, error } = await supabase
      .from('organization')
      .update({
        organizationName,
        organizationAddress,
        organizationContact,
        organizationEmail,
        organizationContactPerson,
        name,
        guardian,
        address,
        age,
        occupation,
        contact,
        email,
        physicallyFit,
        religion,
        foodPreference,
        campExperience,
        natureOfCamper,
        amount,
      })
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message, success: false });
    }

    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Something went wrong', success: false });
  }
}
