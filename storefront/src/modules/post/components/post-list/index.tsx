import React from "react"
import { PostType } from "types/global"

type PostListProps = {
  posts: Array<PostType>,
}

  const PostList = ({posts}: PostListProps) => {
  
  return (
    <div>
      <div className="px-8 py-4  small:pr-0 small:pl-8 small:min-w-[250px]">
        <div className="flex gap-x-3 small:flex-col small:gap-y-3">
          <span className="text-base-semi">Post List</span>
          <ul className="text-base-regular flex items-center gap-x-4 small:grid small:grid-cols-1 small:gap-y-2">
            {posts?.map((c, index) => (
              <li key={c.id} className="flex gap-x-4">
                <label className="flex items-center gap-x-2">
                  {index}
                </label>
                <label className="flex items-center gap-x-2">
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PostList
