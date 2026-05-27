// import { CardText } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import { useLocation } from 'react-router-dom';

// // const ImagePreview = {
// //   display: "flex",
// //   maxWidth: "60%",
// //   maxHeight: "50%",
// //   margin: "20px",
// //   borderRadius: "2px",
// //   borderBottom: "2px "
// // };

// function BasicExample() {
//   const location = useLocation();

//   const { name, sessionName ,sessionDescription, duration, previewImage} = location.state



//   return (
//     <Card style={{ width: '15rem',height:'20rem', marginTop: '20px',borderRadius: '10px',boxShadow: '0px 2px 18px #00000029',
//       border: '1px solid #DDDDDD'}}>
//       <Card.Img  src={previewImage}  style={{ height: '50%'}} />
//          <Card.Body style={{padding: '12px 12px 0px 12px', marginBottom: 0}}>
//          <Card.Title style={{fontSize: 18, fontWeight: 'bold', fontFamily: "Calibri",letterSpacing: '0.53px',margin: 0}}>
//           {sessionName}</Card.Title>
//         <CardText style={{fontSize: 14, color: '#7F7F7F', margin: 0,fontFamily: "Calibri",letterSpacing: '0.53px'}}>{name}</CardText>
//         <Card.Text style={{fontSize: 10, paddingTop: 5,margin: 0, fontFamily: "Calibri",letterSpacing: '0.53px'}}>
//          {sessionDescription}
//         </Card.Text>
//         <div style={{display: 'flex', flexDirection: 'row', gap: 100, marginTop: 10 }}>
//             <CardText style={{fontSize: 14, color: '#DD5041', margin: 0,fontFamily: "Calibri",letterSpacing: '0.53px'}}>{duration} mins</CardText>
//         <Card.Text style={{fontSize: 14,color: '#4E84C4', margin: 0,fontFamily: "Calibri",letterSpacing: '0.53px'}} >Details</Card.Text>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;


import { CardText } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

function BasicExample() {
  const location = useLocation();

  const {
    name = "",
    sessionName = "",
    sessionDescription = "",
    duration = "",
    previewImage = "",
  } = location.state || {};

  return (
    <Card
      style={{
        width: "15rem",
        height: "20rem",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 18px #00000029",
        border: "1px solid #DDDDDD",
      }}
    >
      <Card.Img
        src={previewImage}
        style={{
          height: "50%",
          objectFit: "cover",
        }}
      />

      <Card.Body
        style={{
          padding: "12px 12px 0px 12px",
          marginBottom: 0,
        }}
      >
        <Card.Title
          style={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Calibri",
            letterSpacing: "0.53px",
            margin: 0,
          }}
        >
          {sessionName}
        </Card.Title>

        <CardText
          style={{
            fontSize: 14,
            color: "#7F7F7F",
            margin: 0,
            fontFamily: "Calibri",
            letterSpacing: "0.53px",
          }}
        >
          {name}
        </CardText>

        <Card.Text
          style={{
            fontSize: 10,
            paddingTop: 5,
            margin: 0,
            fontFamily: "Calibri",
            letterSpacing: "0.53px",
          }}
        >
          {sessionDescription}
        </Card.Text>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 100,
            marginTop: 10,
          }}
        >
          <CardText
            style={{
              fontSize: 14,
              color: "#DD5041",
              margin: 0,
              fontFamily: "Calibri",
              letterSpacing: "0.53px",
            }}
          >
            {duration} mins
          </CardText>

          <Card.Text
            style={{
              fontSize: 14,
              color: "#4E84C4",
              margin: 0,
              fontFamily: "Calibri",
              letterSpacing: "0.53px",
            }}
          >
            Details
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;