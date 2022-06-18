import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
export default function CustomizedInputBase({ search, setSearch }) {
  const router = useRouter();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/search`,
        query: {
          q: search,
        },
      },
      `/search?q=${search}`,
      { shallow: true }
    );
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        border: "2px solid black",
      }}
      elevation={0}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Posts by title"
        value={search}
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleSearch}
        onSubmit={handleSubmit}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
