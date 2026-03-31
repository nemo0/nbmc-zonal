import { NextApiRequest, NextApiResponse } from 'next';
import { auth0, getDataApiAccessToken } from '@/lib/auth0';
import { createSupabaseDataClient } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const accessToken = await getDataApiAccessToken(req, res);
    const supabase = createSupabaseDataClient(accessToken);

    if (req.method !== 'PUT') {
      return res.status(400).json({ error: 'Invalid Request', success: false });
    }
    const {
      id,
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

    const camper = {
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
    };

    const { data, error } = await supabase
      .from('individual')
      .update(camper)
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

export default auth0.withApiAuthRequired(handler);
