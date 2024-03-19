import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.SUPABASE_DB_URL || '';
const supabaseKey = process.env.SUPABASE_DB_PROJECT_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
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

export default withApiAuthRequired(handler);
