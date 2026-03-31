import { NextApiRequest, NextApiResponse } from 'next';
import { auth0 } from '@/lib/auth0';
import { supabaseServer } from '@/lib/supabaseServer';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const analytics = {
    totalIndividualsEntry: 0,
    totalOrganizationsEntry: 0,
    totalEntries: 0,
    totalVegetarians: 0,
    totalLeaders: 0,
    campersByOccupation: [],
    campersByReligion: [],
    campersByFoodPreference: [],
    campersByOrganization: [],
  };

  const { data: individual, error } = await supabaseServer
    .from('individual')
    .select('*');

  const { data: organization, error: error2 } = await supabaseServer
    .from('organization')
    .select('*');

  analytics.totalIndividualsEntry = individual?.length || 0;
  analytics.totalOrganizationsEntry = organization?.length || 0;

  const allCampers = [...(individual as any), ...(organization as any)];

  analytics.totalEntries = allCampers.length;

  // By Occupation
  const campersByOccupation = allCampers.reduce((acc, camper) => {
    const occupation = camper.occupation;

    if (!acc[occupation]) {
      acc[occupation] = 0;
    }

    acc[occupation]++;

    const natureOfCamper = camper.natureOfCamper;

    if (natureOfCamper === 'Leader') {
      analytics.totalLeaders++;
    }

    if (camper.foodPreference === 'Vegetarian') {
      analytics.totalVegetarians++;
    }

    return acc;
  }, {} as any);

  analytics.campersByOccupation = Object.entries(campersByOccupation).map(
    ([name, count]) => ({ name, count })
  ) as any;

  const campersByReligion = allCampers.reduce((acc, camper) => {
    const religion = camper.religion;

    if (!acc[religion]) {
      acc[religion] = 0;
    }

    acc[religion]++;
    return acc;
  }, {} as any);

  analytics.campersByReligion = Object.entries(campersByReligion).map(
    ([name, count]) => ({ name, count })
  ) as any;

  const campersByFoodPreference = allCampers.reduce((acc, camper) => {
    const foodPreference = camper.foodPreference;

    if (!acc[foodPreference]) {
      acc[foodPreference] = 0;
    }

    acc[foodPreference]++;
    return acc;
  }, {} as any);

  analytics.campersByFoodPreference = Object.entries(
    campersByFoodPreference
  ).map(([name, count]) => ({ name, count })) as any;

  const campersByOrganization = allCampers.reduce((acc, camper) => {
    const organization = camper.organizationName;

    if (organization) {
      if (!acc[organization]) {
        acc[organization] = 0;
      }

      acc[organization]++;
    }

    return acc;
  }, {} as any);

  analytics.campersByOrganization = Object.entries(campersByOrganization).map(
    ([name, count]) => ({ name, count })
  ) as any;

  if (error || error2) {
    return res.status(400).json({
      error: error?.message || error2?.message || 'Something went wrong',
      success: false,
    });
  }

  return res.status(200).json({ analytics, success: true });
}

export default auth0.withApiAuthRequired(handler);
