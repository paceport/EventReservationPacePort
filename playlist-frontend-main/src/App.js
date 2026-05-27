import { Routes, Route, Outlet } from "react-router-dom" ;

import './App.css';
import MainFile from './Components/MainFile';
import Header from './Components/Header';
import OnSubmit from './Components/OnSubmit';
import CardOverview from "./Components/CardOverview";
import DetailedCardOverview from './Components/DetailedCardOverview'

function App() {
  return (

<Routes>
    <Route path = '/' element = {<RootPage/>}>
      <Route index element= { <MainFile/>} /> 
      <Route path="/onsubmit" element = {<OnSubmit/>}/>
      <Route path="/tocard" element = {<CardOverview/>}/>
      <Route path="/topage" element= {<DetailedCardOverview/>}/>
     </Route>
</Routes>

  );
}

function RootPage(){
  return(
      <div className='main'>
       <Header/>
       <Outlet/>  
       </div>
  );
}

export default App;
