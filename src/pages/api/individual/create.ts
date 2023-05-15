import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import sendEmail from '@/lib/sendMail';

const supabaseUrl = process.env.SUPABASE_DB_URL || '';
const supabaseKey = process.env.SUPABASE_DB_PROJECT_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const __dirname = process.cwd();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
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

    const camper = {
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
    };

    const { data, error } = await supabase.from('individual').insert([camper]);

    if (error) {
      return res.status(400).json({ error: error.message, success: false });
    }

    sendEmail(
      email,
      'Individual Camper Registration',
      camper,
      `${__dirname}/src/templates/individual.ejs`
    );
    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(400).json({ error: error, success: false });
  }
}
