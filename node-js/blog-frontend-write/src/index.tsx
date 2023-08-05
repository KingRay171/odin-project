/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Routes, Route } from "@solidjs/router";

import './index.css'
import App from './App'
import Login from './login';
import Signup from './signup';
import Create from './Create';
import Update from './Update';
import Post from './Post';

const root = document.getElementById('root')

render(
    () => (
        <Router>
            <Routes>
                <Route path={"/"} element={<App />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/create"} element={<Create />} />
                <Route path={"posts/:id/edit"} element={<Update />} />
                <Route path={"/posts/:id"} element={<Post />} />
            </Routes>
        </Router>
    ), root!
)
