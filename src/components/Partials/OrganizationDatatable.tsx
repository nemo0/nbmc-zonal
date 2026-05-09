import React from 'react';
import DataTable from 'react-data-table-component';

import { getHttpErrorMessage, getJson, postBlob } from '@/lib/http';

import Button from '@/components/buttons/Button';
import OrganizationCamperModal from '@/components/OrganizationModal';

const ALL_ORGANIZATIONS = '__all_organizations__';

type OrganizationCamperRow = {
  [key: string]: unknown;
  organizationName?: string | null;
};

function getOrganizationFilterKey(organizationName: unknown) {
  if (typeof organizationName !== 'string') {
    return '';
  }

  return organizationName.trim().toLowerCase();
}

function getOrganizationDisplayName(organizationName: unknown) {
  if (typeof organizationName !== 'string') {
    return '';
  }

  return organizationName.trim();
}

const columns = (handleEditClick: (row: any) => void) => [
  {
    name: 'Created At',
    selector: (row: any) => row.created_at,
    sortable: true,
  },
  {
    name: 'Organization Name',
    selector: (row: any) => row.organizationName,
    sortable: true,
  },
  {
    name: 'Organization Email',
    selector: (row: any) => row.organizationEmail,
  },
  {
    name: 'Organization Contact',
    selector: (row: any) => row.organizationContact,
  },
  {
    name: 'Organization Address',
    selector: (row: any) => row.organizationAddress,
  },
  {
    name: 'Organization Contact Person',
    selector: (row: any) => row.organizationContactPerson,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: 'Father/Mother',
    selector: (row: any) => row.guardian,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: any) => row.address,
  },
  {
    name: 'District',
    selector: (row: any) => row.district,
  },
  {
    name: 'Pin Code',
    selector: (row: any) => row.pin,
  },
  {
    name: 'Age',
    selector: (row: any) => row.age,
  },
  {
    name: 'Occupation',
    selector: (row: any) => row.occupation,
  },
  {
    name: 'Course',
    selector: (row: any) => row.course,
  },
  {
    name: 'Contact',
    selector: (row: any) => row.contact,
  },
  {
    name: 'Physically Fit',
    selector: (row: any) => row.physicallyFit,
  },
  {
    name: 'Religion',
    selector: (row: any) => row.religion,
    sortable: true,
  },
  {
    name: 'Food Preference',
    selector: (row: any) => row.foodPreference,
  },
  {
    name: 'Camp Experience',
    selector: (row: any) => row.campExperience,
  },
  {
    name: 'Nature of Camper',
    selector: (row: any) => row.natureOfCamper,
  },
  {
    name: 'Amount',
    selector: (row: any) => row.amount,
    sortable: true,
  },
  {
    cell: (row: any) => (
      <div
        className='flex'
        onClick={() => {
          handleEditClick(row);
        }}
      >
        <Button className='rounded-none border border-gray-400' variant='light'>
          Edit
        </Button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default function Datatable() {
  const [data, setData] = React.useState<OrganizationCamperRow[]>([]);
  const [selectedOrganizationName, setSelectedOrganizationName] =
    React.useState(ALL_ORGANIZATIONS);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  React.useEffect(() => {
    getJson<{ data: OrganizationCamperRow[] }>('/api/organization/read')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(getHttpErrorMessage(error, 'Failed to load data'));
      });
  }, [modalIsOpen]);

  const organizationOptions = React.useMemo(() => {
    const optionsByFilterKey = new Map<string, string>();

    data.forEach((item) => {
      const filterKey = getOrganizationFilterKey(item.organizationName);
      const displayName = getOrganizationDisplayName(item.organizationName);

      if (!filterKey || optionsByFilterKey.has(filterKey)) {
        return;
      }

      optionsByFilterKey.set(filterKey, displayName);
    });

    return Array.from(optionsByFilterKey.entries())
      .map(([value, label]) => ({ label, value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  React.useEffect(() => {
    if (
      selectedOrganizationName !== ALL_ORGANIZATIONS &&
      !organizationOptions.some(
        (option) => option.value === selectedOrganizationName
      )
    ) {
      setSelectedOrganizationName(ALL_ORGANIZATIONS);
    }
  }, [organizationOptions, selectedOrganizationName]);

  const filteredData = React.useMemo(() => {
    if (selectedOrganizationName === ALL_ORGANIZATIONS) {
      return data;
    }

    return data.filter(
      (item) =>
        getOrganizationFilterKey(item.organizationName) ===
        selectedOrganizationName
    );
  }, [data, selectedOrganizationName]);

  const exportToJson = async () => {
    try {
      const jsonDataForExport = filteredData.map((item: any) => {
        return {
          'Created At': item.created_at,
          'Organization Name': item.organizationName,
          'Organization Email': item.organizationEmail,
          'Organization Contact': item.organizationContact,
          'Organization Address': item.organizationAddress,
          'Organization Contact Person': item.organizationContactPerson,
          Name: item.name,
          Email: item.email,
          'Father/Mother': item.guardian,
          Address: item.address,
          District: item.district,
          'Pin Code': item.pin,
          Age: item.age,
          Occupation: item.occupation,
          Course: item.course,
          Contact: item.contact,
          'Physically Fit': item.physicallyFit,
          Religion: item.religion,
          'Food Preference': item.foodPreference,
          'Camp Experience': item.campExperience,
          'Nature of Camper': item.natureOfCamper,
          Amount: item.amount,
        };
      });

      const blob = await postBlob('/api/export', {
        data: jsonDataForExport,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'entries.xlsx');
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(getHttpErrorMessage(error, 'Unable to export data'));
    }
  };

  return (
    <div>
      {data ? (
        <div className='mb-24'>
          <div className='mb-4 flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
            <div className='w-full sm:max-w-xs'>
              <label
                htmlFor='organization-filter'
                className='mb-1 block text-sm font-medium text-gray-700'
              >
                Filter by organization
              </label>
              <select
                id='organization-filter'
                value={selectedOrganizationName}
                onChange={(event) => {
                  setSelectedOrganizationName(event.target.value);
                }}
                className='focus:border-primary-500 focus:ring-primary-500 block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-1'
              >
                <option value={ALL_ORGANIZATIONS}>All organizations</option>
                {organizationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className='mt-1 text-xs text-gray-500'>
                Showing {filteredData.length} of {data.length} entries
              </p>
            </div>
            <Button
              onClick={() => {
                exportToJson();
              }}
              className='rounded-none border-0'
            >
              Export
            </Button>
          </div>
          <DataTable
            columns={columns(handleEditClick)}
            data={filteredData}
            fixedHeader
          />
          {selectedRow && (
            <OrganizationCamperModal
              isOpen={modalIsOpen}
              onRequestClose={() => {
                setModalIsOpen(false);
                if (selectedRow) {
                  setSelectedRow(null);
                }
              }}
              row={selectedRow}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
