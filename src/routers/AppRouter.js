import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "../routes/Home";
import Buynft from "../routes/Buynft"
import AllNFT from "../routes/AllNFT";
import MyNFT from "../routes/MyNFT";
import Connect from "../routes/Connect";
import MyProfile from "../routes/MyProfile";
import NotFoundPage from "../routes/NotFoundPage";
import Header from '../components/Header';
import NFT from "../routes/NFT";
import Profilesettings from "../components/profileSettings";
import Create from "../routes/Create";
import App from "../components/Blockchain";

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<App />} />
                <Route path="/buynft" element={<Buynft />} />
                <Route path="/AllNFT" element={<AllNFT />} />
                <Route path="/MyNFT" element={<MyNFT />} />
                <Route path="/Buynft" element={<Buynft/>}/>
                <Route path="/create" element={<Create />}/>
                <Route path="/connect" element={<Connect />} />
                <Route path="/NFT/:NFTname" element={<NFT />}/>
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/profileSettings" element={<Profilesettings />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    </BrowserRouter>
)
export default AppRouter;