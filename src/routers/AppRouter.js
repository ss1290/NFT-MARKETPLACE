import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "../routes/Home";
import Buynft from "../routes/Buynft"
import AllNFT from "../routes/AllNFT";
import MyNFT from "../routes/MyNFT";
import MyProfile from "../routes/MyProfile";
import NotFoundPage from "../routes/NotFoundPage";
import Header from '../components/Header';
import NFT from "../routes/NFT";
import profileSettings from "../components/profileSettings";
import Create from "../routes/Create";




const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buynft" element={<Buynft />} />
                <Route path="/AllNFT" element={<AllNFT />} />
                <Route path="/MyNFT" element={<MyNFT />} />
                <Route path="/Buynft" element={<Buynft/>}/>
                <Route path="/create" element={<Create />}/>
                <Route path="/NFT/:NFTname" element={<NFT />}/>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileSettings" element={<profileSettings />} />
                <Route path="*" element={<NotFoundPage />} />
                
            </Routes>
        </div>
    </BrowserRouter>
)
export default AppRouter;