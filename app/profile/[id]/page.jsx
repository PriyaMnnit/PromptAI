"use client";

import Profile from "@components/Profile";
import { connectToDB } from "@utils/database";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function UserProfile({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(
    function () {
      async function fetchPosts() {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
      if (params?.id) fetchPosts();
    },
    [params?.id]
  );
  if (params?.id === session?.user.id) {
    router.push("/profile");
    return null;
  }
  return (
    <Profile
      name={posts[0].creator.username}
      description={`Welcome to ${posts[0].creator.username}'s profile page`}
      data={posts}
    />
  );
}

export default UserProfile;
