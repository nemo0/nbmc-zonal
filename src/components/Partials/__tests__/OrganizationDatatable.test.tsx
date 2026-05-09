import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { getJson, postBlob } from '@/lib/http';

import OrganizationDatatable from '../OrganizationDatatable';

jest.mock('@/lib/http', () => ({
  getHttpErrorMessage: jest.fn((_error: unknown, fallback: string) => fallback),
  getJson: jest.fn(),
  postBlob: jest.fn(),
}));

jest.mock('@/components/OrganizationModal', () => {
  return function MockOrganizationModal() {
    return null;
  };
});

jest.mock('react-data-table-component', () => {
  return function MockDataTable({ data }: { data: any[] }) {
    return (
      <div data-testid='organization-table'>
        {data.map((row) => (
          <div key={row.id} data-testid='table-row'>
            {row.organizationName} - {row.name}
          </div>
        ))}
      </div>
    );
  };
});

const organizationRows = [
  {
    id: 1,
    created_at: '2026-05-01',
    organizationName: 'Alpha Unit',
    organizationEmail: 'alpha@example.com',
    organizationContact: '1111111111',
    organizationAddress: 'Alpha Address',
    organizationContactPerson: 'Alpha Lead',
    name: 'Amit',
    email: 'amit@example.com',
    guardian: 'Guardian A',
    address: 'Address A',
    district: 'Kolkata',
    pin: '700001',
    age: 21,
    occupation: 'Student',
    course: 'Course A',
    contact: '9000000001',
    physicallyFit: 'Yes',
    religion: 'Hindu',
    foodPreference: 'Veg',
    campExperience: 'No',
    natureOfCamper: 'New',
    amount: 100,
  },
  {
    id: 2,
    created_at: '2026-05-02',
    organizationName: ' alpha unit ',
    organizationEmail: 'alpha-two@example.com',
    organizationContact: '2222222222',
    organizationAddress: 'Alpha Address 2',
    organizationContactPerson: 'Alpha Lead 2',
    name: 'Bina',
    email: 'bina@example.com',
    guardian: 'Guardian B',
    address: 'Address B',
    district: 'Howrah',
    pin: '711101',
    age: 22,
    occupation: 'Student',
    course: 'Course B',
    contact: '9000000002',
    physicallyFit: 'Yes',
    religion: 'Hindu',
    foodPreference: 'Non Veg',
    campExperience: 'Yes',
    natureOfCamper: 'Returning',
    amount: 200,
  },
  {
    id: 3,
    created_at: '2026-05-03',
    organizationName: 'Beta Unit',
    organizationEmail: 'beta@example.com',
    organizationContact: '3333333333',
    organizationAddress: 'Beta Address',
    organizationContactPerson: 'Beta Lead',
    name: 'Chandan',
    email: 'chandan@example.com',
    guardian: 'Guardian C',
    address: 'Address C',
    district: 'Hooghly',
    pin: '712101',
    age: 23,
    occupation: 'Student',
    course: 'Course C',
    contact: '9000000003',
    physicallyFit: 'No',
    religion: 'Hindu',
    foodPreference: 'Veg',
    campExperience: 'No',
    natureOfCamper: 'New',
    amount: 300,
  },
];

describe('OrganizationDatatable', () => {
  let anchorClickSpy: jest.SpyInstance;

  beforeAll(() => {
    Object.defineProperty(URL, 'createObjectURL', {
      value: jest.fn(() => 'blob:organization-export'),
      writable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: jest.fn(),
      writable: true,
    });
    anchorClickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation();
  });

  beforeEach(() => {
    (getJson as jest.Mock).mockResolvedValue({ data: organizationRows });
    (postBlob as jest.Mock).mockResolvedValue(new Blob(['xlsx-data']));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    anchorClickSpy.mockRestore();
  });

  it('builds dynamic organization options and filters visible rows', async () => {
    render(<OrganizationDatatable />);

    const filter = await screen.findByLabelText('Filter by organization');

    await waitFor(() => {
      expect(screen.getAllByTestId('table-row')).toHaveLength(3);
    });

    expect(
      Array.from((filter as HTMLSelectElement).options).map(
        (option) => option.textContent
      )
    ).toEqual(['All organizations', 'Alpha Unit', 'Beta Unit']);

    fireEvent.change(filter, { target: { value: 'alpha unit' } });

    expect(screen.getAllByTestId('table-row')).toHaveLength(2);
    expect(screen.getByText(/Amit/)).toBeTruthy();
    expect(screen.getByText(/Bina/)).toBeTruthy();
    expect(screen.queryByText(/Chandan/)).toBeNull();
    expect(screen.getByText('Showing 2 of 3 entries')).toBeTruthy();

    fireEvent.change(filter, { target: { value: '__all_organizations__' } });

    expect(screen.getAllByTestId('table-row')).toHaveLength(3);
    expect(screen.getByText('Showing 3 of 3 entries')).toBeTruthy();
  });

  it('exports only the rows currently selected by the organization filter', async () => {
    render(<OrganizationDatatable />);

    const filter = await screen.findByLabelText('Filter by organization');

    await waitFor(() => {
      expect(screen.getAllByTestId('table-row')).toHaveLength(3);
    });

    fireEvent.change(filter, { target: { value: 'alpha unit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    await waitFor(() => {
      expect(postBlob).toHaveBeenCalledTimes(1);
    });

    expect(postBlob).toHaveBeenCalledWith('/api/export', {
      data: expect.arrayContaining([
        expect.objectContaining({
          Name: 'Amit',
          'Organization Name': 'Alpha Unit',
        }),
        expect.objectContaining({
          Name: 'Bina',
          'Organization Name': ' alpha unit ',
        }),
      ]),
    });
    expect((postBlob as jest.Mock).mock.calls[0][1].data).toHaveLength(2);
  });
});
