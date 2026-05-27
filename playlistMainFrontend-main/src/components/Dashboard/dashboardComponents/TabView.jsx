import SearchBar from "../../Searchbar/SearchBar.jsx";
import TabCard from "../dashboardComponents/TabCard";
import '../dashboardStyles/Body.css';



export default function Tab(){
    return (
        <div className="body">
            <div className="body-title">
                <h3 style={{fontSize: '20px', fontWeight: '600', letterSpacing: '0.4px', marginLeft: '30px'}}>
                    My Invitations    
                </h3>
                <div style={{float: 'right', paddingTop: '20px', paddingRight: '10px'}}>
                  <SearchBar/>
             </div>
            </div>
            <div>
            
            <div className="body-tabs">
                <TabCard/>
            </div>
            
            </div>
        </div>
    )
}


