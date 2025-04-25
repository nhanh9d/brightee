import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Lead {
  id: number;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: string[];
}

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              leads {
                id
                name
                email
                mobile
                postcode
                services
              }
            }
          `
        }),
      });
      const result = await response.json();
      setLeads(result.data.leads);
    };
    fetchLeads();
  }, []);

  return (
    <div className="App">
      <h1>Leads</h1>
      <table className="leads-table" style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#282c34', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Số điện thoại</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mã bưu điện</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Dịch vụ</th>
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead.id} style={{ backgroundColor: lead.id % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{lead.id}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{lead.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{lead.email}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{lead.mobile}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{lead.postcode}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {lead.services.join(', ')}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ padding: '20px', textAlign: 'center' }}>
                Không có dữ liệu nào được tìm thấy
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
