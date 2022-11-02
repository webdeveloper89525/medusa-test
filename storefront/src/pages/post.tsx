import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout, PostType } from "types/global"
import PostList from "@modules/post/components/post-list"
import CreatePost from "@modules/post/components/post-submit"
import { useEffect, useState } from "react"
import axios from "axios";
import { medusaClient, MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { useMutation } from "react-query"

const getPostList = async () => {
  const response = await axios.get(`${MEDUSA_BACKEND_URL}/store/post`);
  return response.data;
};

const Store: NextPageWithLayout = () => {

  const [posts, setPosts] = useState<PostType[]>([])
  const { mutate, isLoading } = useMutation(getPostList, {
    onSuccess: data => {
      console.log(data);
      setPosts(data)
    },
    onError: () => {
      console.log("Failed to get post list.")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });

  const handleUpdatePosts = () => {
    mutate();
  }

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <>
      <Head title="Store" description="Explore all post" />
      <div className="flex flex-col gap-y-3 py-6">
        <CreatePost onCreated={handleUpdatePosts} />
        <PostList posts={posts} />
      </div>
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
