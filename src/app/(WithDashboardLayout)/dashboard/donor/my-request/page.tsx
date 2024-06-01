"use client";
import {
  useGetAllMyBloodRequestQuery,
  useGetSingleBloodRequestReceiverQuery,
} from "@/redux/api/requestApi";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const MyBloodRequest = () => {
  const { data, isLoading, isError } = useGetAllMyBloodRequestQuery({});
  const [selectedId, setSelectedId] = useState("");

  const { data: receiverRequestData, isFetching: isFetchingReceiverData } =
    useGetSingleBloodRequestReceiverQuery(selectedId, { skip: !selectedId });

  useEffect(() => {
    if (data) {
      const approvedRequest = data.myRequest.find(
        (request: any) => request.status === "APPROVED"
      );
      if (approvedRequest) {
        setSelectedId(approvedRequest.receiverId);
      }
    }
  }, [data]);

  const columns: GridColDef[] = [
    { field: "requesterName", headerName: "My Name", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "donorInfo",
      headerName: "Donor Info",
      flex: 5,
      renderCell: (params) => (
        <>
          {params.row.status === "APPROVED" ? (
            isFetchingReceiverData ? (
              <CircularProgress size={20} />
            ) : (
              receiverRequestData && (
                <>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Contact: {receiverRequestData.contactNumber}
                  </Typography>

                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Donor Name: {receiverRequestData.name}
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Location: {receiverRequestData.location}
                  </Typography>
                </>
              )
            )
          ) : (
            <Typography variant="body2" color="textSecondary">
              N/A
            </Typography>
          )}
        </>
      ),
    },
  ];

  const rows = data?.myRequest || [];

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography variant="h6" color="error" textAlign="center" mt={2}>
          Error loading requests. Please try again later.
        </Typography>
      ) : rows.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter autoHeight />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No requests available.
        </Typography>
      )}
    </Box>
  );
};

export default MyBloodRequest;
