import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PlaylistProvider } from "./context/PlaylistContext.jsx";
import { SongProvider } from "./context/SongContext.jsx";
import { ArtistProvider } from "./context/ArtistContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <PlaylistProvider>
          <SongProvider>
            <ArtistProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </ArtistProvider>
          </SongProvider>
        </PlaylistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
