"use client";
import { search } from "@/_api/search";
import { useEffect, useState } from "react";
import SearchResult from "@/_ui/components/SearchResult/SearchResult";
import styles from "./search.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { type: string; name: string; pageNum: string };
}) {
  const [searchData, setSearchData] = useState<any>({
    searchResultData: null,
    loading: true,
  });
  const [query, setQuery] = useState(params.name || ""); // State for search query

  const router = useRouter();

  // Fetch search data whenever the query or page changes
  useEffect(() => {
    const fetchData = async () => {
      let type = params.type;

      // Adjust "films" to "movies" for API compatibility
      if (params.type === "films") {
        type = "movies";
      }

      const data = await search(type, query, params.pageNum);
      setSearchData({ searchResultData: data, loading: false });
    };

    if (["films", "shows", "people"].includes(params.type)) {
      fetchData();
    } else {
      setSearchData({
        searchResultData: { data: [], total_results: 0 },
        loading: false,
      });
    }
  }, [query, params.pageNum, params.type]);

  // Handle search input changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // Update the query state
  };

  // Handle the search submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${params.type}/${query}/page/1`);
    }
  };

  // Handle pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/search/${params.type}/${query}/page/${value}`);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {!searchData.loading && (
        <>
          <div className={styles.resultsInfoContainer}>
            {["films", "shows", "people"].includes(params.type) ? (
              <h2 className={styles.totalResults}>
                {searchData.searchResultData.total_results} {params.type} found
                for &quot;
                {params.name.replace(/\%2B/g, " ").toUpperCase()}&quot;
              </h2>
            ) : (
              <h2 className={styles.totalResults}>
                Invalid search category, &quot;{params.type}&quot;
              </h2>
            )}
          </div>
          <hr className={styles.divider} />
          <ul className={styles.resultsContainer}>
            {searchData.searchResultData.data.map(
              (result: any, index: number) => (
                <li key={index} className={styles.searchEntry}>
                  <SearchResult type={params.type} data={result} />
                  <hr className={styles.divider} />
                </li>
              )
            )}
          </ul>

          <Stack alignItems="center" margin="30px">
            <Pagination
              color={"primary"}
              size={matches ? "medium" : "small"}
              count={searchData.searchResultData.total_pages}
              onChange={handlePageChange}
              page={parseInt(params.pageNum)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}
    </div>
  );
}
