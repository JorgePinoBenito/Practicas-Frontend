import { FunctionalComponent } from "preact/src/index.d.ts";
import axios from "npm:axios";
import { useEffect, useState } from "preact/hooks";
import { Post } from "../types.ts";

const SearchPosts: FunctionalComponent = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    getPosts();
  }, [searchTitle]);

  const getPosts = async () => {
    try {
      const data = await axios.get<Post[]>(
        ` https://back-p5-y0e1.onrender.com/api/post?search=${searchTitle}`,
      );
      setPosts(data.data);
    } catch (e) {
      console.error("Error:", e);
      setPosts([]);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTitle}
          onInput={(e) => setSearchTitle(e.currentTarget.value)}
        />
      </div>
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <img src={post.cover} alt={post.title} />
              <p>{post.content}</p>
              <p>Autor: {post.author}</p>
              <p>Likes: {post.likes}</p>
              <p>Comentarios:</p>
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment._id}>
                    <strong>{comment.author}</strong>: {comment.content}
                  </li>
                ))}
              </ul>
              <p>Creado el: {new Date(post.createdAt).toLocaleString()}</p>
              <p>Actualizado el: {new Date(post.updatedAt).toLocaleString()}</p>
              <p>Version: {post.__v}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SearchPosts;
