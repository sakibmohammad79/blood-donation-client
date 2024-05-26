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
  const { data, isLoading } = useGetAllMyBloodRequestQuery({});
  const [selectedId, setSelectedId] = useState("");
  console.log(selectedId);
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
  // const { data: requestReceiverData } = useGetSingleBloodRequestReceiverQuery(
  //   {}
  // );
  // const { data, isLoading } = useGetAllMyBloodRequestQuery({});

  // const columns: GridColDef[] = [
  //   { field: "requesterName", headerName: "My Name", flex: 1 },
  //   { field: "bloodType", headerName: "Blood Type", flex: 1 },
  //   { field: "requestDate", headerName: "Request Date", flex: 1 },
  //   { field: "status", headerName: "Status", flex: 1 },
  // ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={data?.myRequest} columns={columns} hideFooter />
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default MyBloodRequest;
