"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          post={post}
          key={post._id}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  function handleTagClick(e) {
    const tag = e.replace("#", "");
    setSearchText(tag);
  }
  useEffect(function () {
    async function fetchPosts() {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setSearchedResults(data);
    }
    fetchPosts();
  }, []);

  function filterPrompts(searchText) {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }

  return (
    <section className="feed">
      <form className="relatiev w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedResults}
        handleTagClick={(e) => handleTagClick(e)}
      />
    </section>
  );
}

export default Feed;
