import { mockwholeData } from "./mockdata";

/**
 * Search movies based on type, name, and pagination.
 * @param type - Type of search (e.g., "movies", "shows", "people").
 * @param name - Search query.
 * @param pageNum - Page number for pagination.
 * @returns Filtered results with pagination metadata.
 */
export const search = async (type: string, name: string, pageNum: string) => {
  const page = parseInt(pageNum, 10) || 1; // Convert pageNum to an integer
  const itemsPerPage = 10; // Number of results per page

  // Filter data based on the query
  const filteredResults = mockwholeData.filter((movie) =>
    movie.title.toLowerCase().includes(name.toLowerCase())
  );

  // Paginate the filtered results
  const totalResults = filteredResults.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return {
    data: paginatedResults,
    total_results: totalResults,
    total_pages: totalPages,
  };
};
