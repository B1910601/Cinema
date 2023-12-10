import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts';
import usersApi from '../../api/usersApi';

export default function MoviesManagement() {
  const [phim, setPhim] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [Rap, setCumRap] = useState([]);
  useEffect(() => {
    usersApi.getCumRap()
      .then(response => {
        console.log(response.data);
        setCumRap(response.data);
      })
      .catch(error => {
        console.error('Error fetching Rap:', error);
      });
  }, []);


  useEffect(() => {
    usersApi.getMonth()
      .then(response => {
        console.log(response.data);
        setRevenue(response.data);
      })
      .catch(error => {
        console.error('Error fetching revenue:', error);
      });
  }, []);

  useEffect(() => {
    usersApi.getPhim()
      .then(response => {
        console.log(response.data);
        setPhim(response.data);
      })
      .catch(error => {
        console.error('Error fetching phim:', error);
      });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%', paddingBottom: '50px' }}>
      <h3>Thông kê doanh thu theo Rạp</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Tên cụm rạp</th>
            <th scope="col">Doanh thu</th>
            <th scope="col">Suất chiếu</th>
          </tr>
        </thead>
        <tbody>
          {Rap.map((item, index) => (
            <tr key={index}>
              <td>{item.tenCumRap}</td>
              <td>{item.tongDoanhThuRap}</td>
              <td>{item.suatchieu}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h3>Thông kê theo từng tháng</h3>
      {revenue.length > 0 ? (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: revenue.map(item => 'Tháng ' + item.thang),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: revenue.map(item => item.doanhSo),
            },
          ]}
          width={1500}
          height={350}
          margin={{ top: 20, right: 30, bottom: 50, left: 100 }}
        />
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <h3>Thống kê doanh thu phim</h3>
      {phim.length > 0 ? (

        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: phim.map(item => item.tenPhim),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: phim.map(item => item.tongDoanhThuPhim),
            },
          ]}
          width={1500}
          height={350}
          margin={{ top: 20, right: 30, bottom: 50, left: 100 }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}