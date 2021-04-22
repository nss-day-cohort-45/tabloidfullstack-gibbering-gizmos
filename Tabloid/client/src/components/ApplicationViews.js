import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostForm from "./posts/PostForm"
import UserPosts from './posts/UserPosts';
import PostList from './posts/PostList';
import PostDetails from "./posts/PostDetails";
import PostEdit from "./posts/PostEdit";
import CategoryList from "./categories/CategoryList";
import CategoryDelete from './categories/CategoryDelete'
import CategoryForm from "./categories/CategoryForm";
import CategoryEdit from "./categories/CategoryEdit";
import TagList from "./tags/TagList";
import TagDelete from './tags/TagDelete';
import TagForm from "./tags/TagForm";
import TagEdit from "./tags/TagEdit";
import PostTag from "./posts/PostTag";
import UserProfiles from './userprofiles/UserProfiles';

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/posts" exact>
          <PostList />
        </Route>

        <Route path="/post/create">
          <PostForm />
        </Route>

        <Route path={`/myfeed/:id`}>
          <UserPosts />
        </Route>

        <Route path={`/posts/:id`} exact>
          <PostDetails />
        </Route>

        <Route path={`/posts/edit/:id`}>
          <PostEdit />
        </Route>

        <Route path="/categories" exact>
          <CategoryList />
        </Route>

        <Route path={`/categories/delete/:id`}>
          <CategoryDelete />
        </Route>

        <Route path={`/categories/add`}>
          <CategoryForm />
        </Route>

        <Route path={`/categories/edit/:id`}>
          <CategoryEdit />
        </Route>

        <Route path="/tags" exact>
          <TagList />
        </Route>

        <Route path="/tags/delete/:id">
          <TagDelete />
        </Route>

        <Route path={`/tags/add`}>
          <TagForm />
        </Route>

        <Route path={`/tags/edit/:id`}>
            <TagEdit />
        </Route>
        
        <Route path={`/tagManager/:id`}>
            <PostTag />
        </Route>

        <Route path={`/userprofiles`}>
            <UserProfiles/>
        </Route>

      </Switch>
    </main>
  );
};
