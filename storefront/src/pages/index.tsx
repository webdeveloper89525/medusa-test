import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import Layout from "@modules/layout/templates"
import PostModule from "@modules/post/components/post"

import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Home" description="Explore all post" />
      <div className="flex flex-col gap-y-3 py-6">
        <PostModule />
        <FeaturedProducts />
      </div>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
