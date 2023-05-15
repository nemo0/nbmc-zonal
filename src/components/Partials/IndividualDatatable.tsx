import axios from 'axios';
import React from 'react';
import DataTable from 'react-data-table-component';

import Button from '@/components/buttons/Button';
import CamperModal from '@/components/IndividualModal';

const columns = (handleEditClick: (row: any) => void) => [
  {
    name: 'Created At',
    selector: (row: any) => row.created_at,
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
    name: 'Guardian',
    selector: (row: any) => row.guardian,
    sortable: true,
  },
  {
    name: 'Address',
    selector: (row: any) => row.address,
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
  const [data, setData] = React.useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleEditClick = (row: any) => {
    setSelectedRow(row);
    setModalIsOpen(true);
  };

  React.useEffect(() => {
    axios.get('/api/individual/read').then((res) => {
      setData(res.data.data);
    });
  }, [modalIsOpen]);

  const exportToJson = async () => {
    try {
      const jsonDataForExport = data.map((item: any) => {
        return {
          'Created At': item.created_at,
          Name: item.name,
          Email: item.email,
          Guardian: item.guardian,
          Address: item.address,
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

      const response = await axios.post(
        '/api/export',
        {
          data: jsonDataForExport,
        },
        {
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'entries.xlsx');
      document.body.appendChild(link);
      link.click();

      link.parentNode && link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data ? (
        <div className='mb-24'>
          <div className='flex w-full justify-end'>
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
            data={data}
            fixedHeader
          />
          {selectedRow && (
            <CamperModal
              isOpen={modalIsOpen}
              onRequestClose={() => {
                setModalIsOpen(false);
                selectedRow && setSelectedRow(null);
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
