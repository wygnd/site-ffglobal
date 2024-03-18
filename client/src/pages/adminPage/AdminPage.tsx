import React, {useMemo, useState} from 'react';
import {useCounter} from "@/store/counterStore";
import {IPost} from "@/@types/post";
import getPostsByType from "@/http/posts";

const AdminPage = () => {

  const {count} = useCounter();
  const [posts, setPosts] = useState<IPost[]>([]);

  useMemo(async () => {
    await getPostsByType('page');
  }, [])


  return (
    <div>
      <h1>This admin panel</h1>
      <h2>This count is <b>{count}</b></h2>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default AdminPage;