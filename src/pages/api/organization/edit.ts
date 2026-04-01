import { NextApiRequest, NextApiResponse } from 'next';

import { requireApprovedAdminApi } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabaseServer';

import { IIndividualCamper } from '@/components/Partials/IndividualForm';

export interface IOrganizationCamper extends IIndividualCamper {
  id: string;
  organizationName: string;
  organizationAddress: string;
  organizationContact: string;
  organizationEmail: string;
  organizationContactPerson: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!(await requireApprovedAdminApi(req, res))) {
      return;
    }

    const supabase = createSupabaseAdminClient();

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
      district,
      pin,
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
        district,
        pin,
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
  } catch {
    return res
      .status(400)
      .json({ error: 'Something went wrong', success: false });
  }
}

export default handler;
