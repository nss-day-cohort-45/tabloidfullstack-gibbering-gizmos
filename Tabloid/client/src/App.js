import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from './providers/CategoryProvider';
import { TagProvider } from './providers/TagProvider';


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CategoryProvider>
            <TagProvider>
              <Header />
              <ApplicationViews />
            </TagProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProfileProvider>

    </Router>
  );
}

export default App;
