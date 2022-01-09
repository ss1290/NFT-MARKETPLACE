import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "../routes/Home";
import Buynft from "../routes/Buynft"
import AllNFT from "../routes/AllNFT";
import MyNFT from "../routes/MyNFT";
import Sellnft from "../routes/Sellnft"
import MyProfile from "../routes/MyProfile";
import NotFoundPage from "../routes/NotFoundPage";
import Header from '../components/Header';
import NFT from "../routes/NFT";
import Profilesettings from "../components/profileSettings";
import Create from "../routes/Create";


const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AllNFT" element={<AllNFT />} />
                <Route path="/MyNFT" element={<MyNFT />} />
                <Route path="/Buynft/:nftId" element={<Buynft/>}/>
                <Route path="/create" element={<Create />}/>
                <Route path="/Sellnft/:nftId" element={<Sellnft />}/>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileSettings" element={<Profilesettings />} />
                <Route path="*" element={<NotFoundPage />} />
                
            </Routes>
        </div>
    </BrowserRouter>
)
export default AppRouter;