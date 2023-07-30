"use client";

import Profile from "@components/Profile";
import { connectToDB } from "@utils/database";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function MyProfile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(
    function () {
      async function fetchPosts() {
        const response = await fetch(`api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
      if (session?.user.id) fetchPosts();
    },
    [session?.user.id]
  );
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {}
    }
  };
  return (
    <Profile
      name="My"
      description="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
