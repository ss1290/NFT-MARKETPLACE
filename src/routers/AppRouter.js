import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "../components/Home";
import AllNFT from "../components/AllNFT";
import MyNFT from "../components/MyNFT";
import Create from "../components/Create";
import MyProfile from "../components/MyProfile";
import NotFoundPage from "../components/NotFoundPage";
import Header from '../components/Header';
import NFT from "../components/NFT";

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AllNFT" element={<AllNFT />} />
                <Route path="/MyNFT" element={<MyNFT />} />
                <Route path="/create" element={<Create />} />
                <Route path="/NFT/:NFTname" element={<NFT />}/>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </BrowserRouter>
)
export default AppRouter;