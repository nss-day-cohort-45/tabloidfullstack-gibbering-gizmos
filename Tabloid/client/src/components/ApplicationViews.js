import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserPosts from './UserPosts';
import PostList from './PostList';
import PostDetails from "./PostDetails";
import CategoryList from "./CategoryList";

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

        <Route path={`/myfeed/:id`}>
          <UserPosts/>
        </Route>

        <Route path={`/posts/:id`}>
          <PostDetails/>
        </Route>

        <Route path="/categories" exact>
          <CategoryList />
        </Route>
      </Switch>
    </main>
  );
};
