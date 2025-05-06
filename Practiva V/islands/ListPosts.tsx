import { FunctionalComponent } from "preact/src/index.d.ts";
import { ApiFetchResponse, Post } from "../types.ts";
import { useSignal } from "@preact/signals";

type Props = {
  posts: ApiFetchResponse;
};

const ListPosts: FunctionalComponent<Props> = (props) => {
  const isGridView = useSignal<boolean>(false);

  const toggleView = () => {
    isGridView.value = !isGridView.value;
  };

  return (
    <div>
      <button
        onClick={toggleView}
      >
        {isGridView.value ? "Switch to List View" : "Switch to Grid View"}
      </button>
      <div>
        {props.posts.data.posts.map((post: Post) => (
          <div
            key={post._id}
          >
            {isGridView.value && <img src={post.cover} alt={post.title} />}
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPosts;
