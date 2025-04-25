import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { GridPostList, Loader } from "@/components/shared";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  // Mock data for posts
  const mockPosts = {
    pages: [
      {
        documents: [
          {
            $id: "4",
            creator: {
              $id: "user5",
              name: "David Wilson",
              username: "davidw",
              imageUrl: "/assets/icons/profile-placeholder.svg"
            },
            imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd7?auto=format&fit=crop&w=600&q=80",
            caption: "Hackathon winners! 🏆 #CampusTech #Innovation",
            location: "Tech Center",
            tags: ["CampusTech", "Innovation"],
            likes: [],
            saves: [],
          },
          {
            $id: "5",
            creator: {
              $id: "user6",
              name: "Lisa Park",
              username: "lisap",
              imageUrl: "/assets/icons/profile-placeholder.svg"
            },
            imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
            caption: "Art exhibition opening night 🎨 #CampusArts",
            location: "Art Gallery",
            tags: ["CampusArts"],
            likes: [],
            saves: [],
          },
          {
            $id: "6",
            creator: {
              $id: "user7",
              name: "James Smith",
              username: "james_s",
              imageUrl: "/assets/icons/profile-placeholder.svg"
            },
            imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            caption: "Basketball team practice 🏀 #CampusSports",
            location: "Sports Complex",
            tags: ["CampusSports"],
            likes: [],
            saves: [],
          }
        ]
      }
    ]
  };

  // Mock data for search results
  const mockSearchResults = {
    documents: [
      {
        $id: "7",
        creator: {
          $id: "user8",
          name: "Rachel Green",
          username: "rachelg",
          imageUrl: "/assets/icons/profile-placeholder.svg"
        },
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        caption: "Campus food festival 🍕 #CampusFood",
        location: "Student Center",
        tags: ["CampusFood"],
        likes: 95,
        saved: 30,
      }
    ]
  };

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  const displayPosts = (posts && posts.pages && posts.pages.some((item) => item.documents && item.documents.length > 0)) ? posts : mockPosts;
  const displaySearchedPosts = (searchedPosts && searchedPosts.documents && searchedPosts.documents.length > 0) ? searchedPosts : mockSearchResults;

  if (!displayPosts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && 
    displayPosts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Discover Campus Life</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search campus posts, events, and more..."
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Trending on Campus</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={displaySearchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">No posts found</p>
        ) : (
          displayPosts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
