import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { NextPageWithLayout } from "types/global"
import PostModule from "@modules/post/components/post"


const Store: NextPageWithLayout = () => {

  return (
    <>
      <Head title="Store" description="Explore all post" />
      <div className="flex flex-col gap-y-3 py-6">
        <PostModule />
      </div>
    </>
  )
}

Store.getLayout = (page) => <Layout>{page}</Layout>

export default Store
