import Navbar from "../Navbar/Navbar";



const Item = (props) => {
  
  const { page , navTitle} = props;
 
    return (
      <Navbar navTitle={navTitle}>
        {page}
     </Navbar>
    );
  
};

export default Item;

