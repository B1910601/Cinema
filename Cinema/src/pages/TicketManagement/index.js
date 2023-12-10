import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridOverlay } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
import slugify from "slugify";
import Action from "./Action";
import usersApi, { getDanhSachVeDaDat } from "../../api/usersApi";
import { useHistory } from "react-router-dom";
import theatersApi from "../../api/theatersApi";
export default function MoviesManagement() {
  const [datVeDaDat, setDatVeDaDat] = useState([]);
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  useEffect(() => {
    usersApi.getDanhSachVeDatCuaKhachHang()
      .then((result) => {
        console.log("RESULT", result);
        const rows = result.data.map((item, index) => ({
          ...item,
          id: index + 1, // Assigning a unique id to each row
        }));
        setDatVeDaDat(rows);
      })
      .catch((error) => {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
        console.error(error);
      });
  }, []);

  const handleButtonClick = (params) => {
    const tenTaiKhoan = params.row.tenTaiKhoan;
    const maGhe = params.row.maGhe;
    const id = params.row.id;

    // Sử dụng giá trị tenTaiKhoan, maGhe và id trong API
    usersApi.updateStatusOfTicket({ maGhe: maGhe, taiKhoanNguoiDat: tenTaiKhoan, id: id })
      .then(() => {
        // Cập nhật trạng thái của hàng trong DataGrid thành đã xử lý
        const updatedRows = datVeDaDat.map((row) => {
          if (row.id === id) {
            return { ...row, isConfirm: true };
          }
          return row;
        });

        // Cập nhật dữ liệu trong DataGrid
        setDatVeDaDat(updatedRows);
      })
      .catch((error) => {
        // Xử lý lỗi
      });
  };

  const handleButtonInvoiceClick = (params) => {
    const url = `/invoice?maghe=${params.row.maGhe}&taiKhoan=${params.row.tenTaiKhoan}`;
    window.open(url, "_blank");
  }
  const handleDeleteTicket = (maGhe) => {
    console.log("delete")
    usersApi.deleteTicketOfUser({ maGhe: maGhe });
    window.location.reload();
  }
  const handleDeleteOne = (maGhe) => {
    usersApi.getDanhSachVe(maGhe).then((result) => {
      setData(result.data);
      console.log("Cum Rap", result.data);

      let flag = result.data.every((d) => d.status === true);
      if (flag) {
        // Thực hiện xóa user và vé khi tất cả vé đã được xác thực
        const canDelete = window.confirm(
          'Bạn có chắc chắn muốn xóa?'
        );
        if (canDelete) {
          theatersApi.xoaVeDat({ maGhe: maGhe });
          window.location.reload();
        }
      } else {
        alert("Vé Không thể xóa vì chưa xử lý!!!");
      }
    });
  };
  const columns = [
    {
      field: "maLichChieu",
      headerName: "Mã lịch chiếu",
      hide: true,
      width: 130,
    },
    {
      field: "maGhe",
      headerName: "Mã Ghế",
      hide: true,
      width: 130,
    },
    {
      field: "hanhDong",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <Action

          onDeleted={() => handleDeleteOne(params.row.maGhe)}
          phimItem={params.row.maGhe}
        />
      ),
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",

    },
    {
      field: "tenTaiKhoan",
      headerName: "Tài khoản đặt vé",
      width: 200,
      type: "dateTime",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "tenPhim",
      headerName: "Tên Phim",
      width: 230,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "tenCumRap",
      headerName: "Tên Cụm Rạp",
      width: 300,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "tenRap",
      headerName: "Tên Rạp",
      width: 400,
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "diaChi",
      headerName: "Địa Chỉ",
      width: 200,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "ngayChieu",
      headerName: "Ngày chiếu giờ chiếu",
      width: 200,
      type: "dateTime",
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "tenDayDu",
      headerName: "Ghế",
      width: 200,
      type: "dateTime",
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header",
    },
    {
      field: "loaiGhe",
      headerName: "Loại Ghế",
      width: 200,
      type: "text",
      headerAlign: "center",
      align: "left",
      headerClassName: "custom-header"
    },
    {
      field: "giaVe",
      headerName: "Giá vé(vnđ)",
      width: 130,
      type: "number",
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: 'isConfirm',
      headerName: 'Thao tác',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        if (params.row.isConfirm === false) {
          return (
            <button type="button" className="btn btn-danger" onClick={() => handleButtonClick(params)}>
              Chưa xử lý
            </button>
          );
        } else {
          return (
            <button type="button" className="btn btn-success" disabled>
              Đã xử lý
            </button>
          );
        }
      }
    }
    , {
      field: 'invoice',
      headerName: 'In vé',
      width: 130,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        return (
          <button type="button" className="btn btn-success" onClick={() => handleButtonInvoiceClick(params)}>
            In vé
          </button>
        );
      }
    }

  ];

  return (
    <div style={{ height: "100vh", paddingBottom: "400px", paddingTop: "50px", width: "100%" }}>
      <DataGrid
        rows={datVeDaDat}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[10, 25, 50]}
        loading={datVeDaDat.length === 0} // Show loading overlay until data is fetched
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          Toolbar: GridToolbar,
        }}
        // Show loading overlay until data is fetched
        sortModel={[{ field: "maLichChieu", sort: "asc" }]}
      />
    </div>
  );
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <CircularProgress style={{ margin: "auto" }} />
    </GridOverlay>
  );
}