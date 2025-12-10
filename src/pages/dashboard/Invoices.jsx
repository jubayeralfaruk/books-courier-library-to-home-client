import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

export default function Invoices() {
  const api = UseAxiosSecure();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api
      .get("/payments")
      .then((res) => setInvoices(res.data || []))
      .catch((err) => console.error("Failed to fetch invoices", err));
  }, [api]);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}>
        Invoices
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Payment ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Book</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv._id}>
                <TableCell>{inv.paymentId || inv.id || "—"}</TableCell>
                <TableCell>
                  {typeof inv.amount === "number"
                    ? `$${inv.amount.toFixed(2)}`
                    : inv.amount}
                </TableCell>
                <TableCell>
                  {inv.date?.slice(0, 10) || inv.createdAt?.slice(0, 10) || "—"}
                </TableCell>
                <TableCell>{inv.bookTitle || inv.bookName || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
