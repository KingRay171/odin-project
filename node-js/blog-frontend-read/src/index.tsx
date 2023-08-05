import { render } from 'solid-js/web'
import { Router, Routes, Route } from "@solidjs/router";

import './index.css'
import App from './App'
import Login from './login';
import Signup from './signup';
import Post from './Post';
import Posts from './Posts';

const root = document.getElementById('root')

render(
    () => (
        <Router>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/posts/:id"} element={<Post />} />
                <Route path={"/posts"} element={<Posts />} />
            </Routes>
        </Router>
    ), root!
)
