import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PostsList } from './features/posts/PostsList'
import { AddPostForm } from './features/posts/AddPostForm'

import { Navbar } from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <AddPostForm />
              <PostsList />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
