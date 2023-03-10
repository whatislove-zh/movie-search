import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DetailsCard } from "@/components/DetailsCard";

export default function Home() {
  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DetailsCard />
        </Box>
      </Container>
    </>
  );
}
