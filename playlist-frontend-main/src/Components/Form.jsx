import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect } from "react";
import "./form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropzoneComponent, DropzoneVidoeComponent } from "./DragDrop";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import { useForm } from "./FormContext";
import MySelectComponent from "./DropdownSelectInput";

function MainForm({ setIsLoading }) {
  const { formData, updateFormData } = useForm();
  const { detailed, overview } = formData;

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("handleSubmit called");

    if (
      !overview.overviewImage[0] ||
      !detailed.bannerImage[0] ||
      !detailed.bannerVideo[0]
    ) {
      console.error("No image file found to append.");
      setIsLoading(false);
      alert("Please upload all media files.");
      return;
    }

    // Create a FormData object
    const dataForm = new FormData();

    // Append files to formData
    dataForm.append("overviewImage", overview.overviewImage[0]);
    dataForm.append("bannerImage", detailed.bannerImage[0]);
    dataForm.append("bannerVideo", detailed.bannerVideo[0]);

    // Remove the images and video from formData before converting to JSON
    const jsonFormData = {
      ...formData,
      overview: {
        ...formData.overview,
        overviewImage: undefined,
      },
      detailed: {
        ...formData.detailed,
        bannerImage: undefined,
        bannerVideo: undefined,
      },
    };
    console.log("formData", formData);

    // Append the JSON part of the data to the FormData object
    dataForm.append("json", JSON.stringify(jsonFormData));

    const apiUrl = `${process.env.REACT_APP_API_URL}/submit/new`;
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(apiUrl, {  
        method: 'POST',  
        headers: {
          'x-api-key': apiKey,  // Include your API key in the Authorization header
        },
        body: dataForm, // Send the FormData object directly  
    }) 
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.status === 201) {
          setIsLoading(false);
          navigate("/onsubmit");

          // reset
          updateFormData("session", "empID", "");
          updateFormData("session", "name", "");
          updateFormData("session", "role", "");
          updateFormData("overview", "sessionName", "");
          updateFormData("overview", "sessionDescription", "");
          updateFormData("overview", "duration", "");
          updateFormData("overview", "overviewImage", []);
          updateFormData("overview", "category", "");
          updateFormData("detailed", "bannerText", "");
          updateFormData("detailed", "bannerDetailedText", "");
          updateFormData("detailed", "bannerImage", []);
          updateFormData("detailed", "bannerVideo", []);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Unable to Submit the Form, Please try again later");
      });
  };

  const onClick = () => {
    const formdata = {
      name: formData.session.name,
      sessionName: formData.overview.sessionName,
      sessionDescription: formData.overview.sessionDescription,
      duration: formData.overview.duration,
      previewImage: formData.overview.overviewImage[0]?.preview,
    };
    navigate("/tocard", { state: formdata });
  };

  const onDetailClick = () => {
    const pageData = {
      name: formData.session.name,
      sessionName: formData.overview.sessionName,
      duration: formData.overview.duration,

      bannerText: formData.detailed.bannerText,
      bannerDetailedText: formData.detailed.bannerDetailedText,
      bannerVideo: formData.detailed.bannerVideo,
      previewVideo: formData.detailed.bannerVideo[0]?.preview,
      previewImage: formData.detailed.bannerImage[0]?.preview,
    };
    navigate("/topage", { state: pageData });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let section;
    if (["empID", "name", "role"].includes(name)) {
      section = "session";
    } else if (
      [
        "bannerText",
        "bannerDetailedText",
        "bannerImage",
        "bannerVideo",
      ].includes(name)
    ) {
      section = "detailed";
    } else if (
      [
        "sessionName",
        "sessionDescription",
        "duration",
        "overviewImage",
        "category",
      ].includes(name)
    ) {
      section = "overview";
    }

    if (type === "number") {
      if (name === "empID" && value.length <= 10) {
        updateFormData(section, name, Number(value));
      } else if (name === "duration" && value.length <= 3) {
        updateFormData(section, name, Number(value));
      }
    } else {
      const regex = /^[A-Za-z ]/;
      if (value === "" || regex.test(value) || name === "category") {
        updateFormData(section, name, value);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group
          style={{ maxWidth: "150px", flex: 1, padding: 0 }}
          controlId="empId"
        >
          <Form.Label>Employee Id</Form.Label>
          <Form.Control
            type="number"
            required
            name="empID"
            value={formData.session.empID || ""}
            onChange={handleChange}
            style={{ width: 150, border: " 1px solid #A1A1A1" }}
          />
        </Form.Group>

        <Form.Group style={{ maxWidth: "250px", flex: 1, padding: 0 }}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={formData.session.name}
            name="name"
            onChange={handleChange}
            style={{ width: 250, border: " 1px solid #A1A1A1" }}
          />
        </Form.Group>

        <Form.Group style={{ maxWidth: "250px", flex: 1, padding: 0 }}>
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            required
            maxLength={100}
            value={formData.session.role}
            name="role"
            onChange={handleChange}
            style={{ width: 250, border: " 1px solid #A1A1A1" }}
          />
        </Form.Group>
      </Row>
      <span className="label">COMPOSE YOUR SESSION</span>
      <hr
        style={{
          width: "93%",
          margin: "5px 0 0 30px",
          borderTop: "3px Solid black",
          borderRadius: 10,
        }}
      />

      <div id="overview-card">
        <header className="overview-card-header">
          <span className="overview-label">OVERVIEW CARD</span>
        </header>

        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "left",
          }}
        >
          <Form.Group style={{ maxWidth: "250px", flex: 1, padding: 0 }}>
            <Form.Label>Session Name</Form.Label>
            <Form.Control
              type="text"
              name="sessionName"
              required
              value={formData.overview.sessionName}
              onChange={handleChange}
              style={{ width: 250, border: " 1px solid #A1A1A1" }}
            />
          </Form.Group>
          <Form.Group style={{ maxWidth: "250px", flex: 1, padding: 0 }}>
            <Form.Label>Category</Form.Label>
            <MySelectComponent
              name="category"
              value={formData.overview.category}
              onSelect={handleChange}
            />
          </Form.Group>
          <Form.Group style={{ maxWidth: "150px", padding: 0 }}>
            <Form.Label style={{ paddingLeft: "10px" }}>Duration</Form.Label>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Form.Control
                type="number"
                required
                name="duration"
                value={formData.overview.duration || ""}
                onChange={handleChange}
                style={{ width: 100, border: " 1px solid #A1A1A1" }}
              />
              <span style={{ fontSize: 10, fontWeight: "bold", width: 20 }}>
                mins
              </span>
            </div>
          </Form.Group>
        </Row>
        <div style={{ margin: "0 30px 30px 30px" }}>
          <label class="form-label">Overview Text</label>
          <textarea
            class="form-control"
            maxLength={200}
            rows="2"
            name="sessionDescription"
            value={formData.overview.sessionDescription}
            onChange={handleChange}
            style={{ border: " 1px solid #A1A1A1" }}
          ></textarea>
          <Form.Text
            className="text-muted"
            style={{ fontSize: 10, fontWeight: "bold" }}
          >
            Maximum 200 characters
          </Form.Text>
        </div>
        <span className="dropbox-text">Attach Image</span>

        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            marginLeft: 30,
            marginBottom: 30,
          }}
        >
          <DropzoneComponent
            updateFormData={updateFormData}
            section="overview"
            arrayName="overviewImage"
            imageFiles={formData.overview.overviewImage}
          />
          <Form.Text
            className="text-muted"
            style={{ fontSize: 10, fontWeight: 550, marginLeft: 200 }}
          >
            Accepted file types: JPEG, JPG, PNG, SVG, TIFF, BMP
          </Form.Text>
        </div>
        <Button
          onClick={onClick}
          style={{ marginLeft: 50, marginTop: 60, width: 180 }}
        >
          Preview Overview Card
        </Button>
      </div>

      {/* Detailed Page */}

      <div id="detail-page">
        <header className="overview-card-header">
          <span className="overview-label">DETAILS PAGE</span>
        </header>

        <Row>
          <Form.Group style={{ maxWidth: "250px", flex: 1, padding: 0 }}>
            <Form.Label>Banner Text</Form.Label>
            <Form.Control
              type="text"
              maxLength={50}
              required
              name="bannerText"
              value={formData.detailed.bannerText}
              onChange={handleChange}
              style={{ width: 250, border: " 1px solid #A1A1A1" }}
            />
            <Form.Text
              className="text-muted"
              style={{ fontSize: 10, fontWeight: 550 }}
            >
              Maximum 50 characters
            </Form.Text>
          </Form.Group>
        </Row>
        <div style={{ margin: "0 30px 30px 30px" }}>
          <label class="form-label">Detailed Text</label>
          <textarea
            class="form-control"
            maxLength={2000}
            required
            rows="3"
            name="bannerDetailedText"
            value={formData.detailed.bannerDetailedText}
            onChange={handleChange}
            style={{ border: " 1px solid #A1A1A1" }}
          ></textarea>
          <Form.Text
            className="text-muted"
            style={{ fontSize: 10, fontWeight: 550 }}
          >
            Maximum 2000 characters
          </Form.Text>
        </div>

        <Tabs
          className="mb-1"
          style={{
            borderBottom: "2px solid #00000029",
            margin: 20,
            display: "flex",
          }}
        >
          <Tab eventKey="home" title="Attach Banner Image">
            <span className="dropbox-text">Attach Image</span>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                marginLeft: 30,
                marginBottom: 30,
              }}
            >
              <DropzoneComponent
                updateFormData={updateFormData}
                section="detailed"
                arrayName="bannerImage"
                imageFiles={formData.detailed.bannerImage}
              />
              <Form.Text
                className="text-muted"
                style={{ fontSize: 10, fontWeight: 550, marginLeft: 200 }}
              >
                Accepted file types: JPEG, JPG, PNG, SVG, TIFF, BMP
              </Form.Text>
              <Form.Text
                className="text-muted"
                style={{ fontSize: 10, fontWeight: 550, marginLeft: 200 }}
              >
                * Preferred dimension 1800 x 500 for best view
              </Form.Text>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Embed Video">
            <span className="dropbox-text">Attach Video</span>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                marginLeft: 30,
                marginBottom: 30,
              }}
            >
              {/* Video Component */}
              <DropzoneVidoeComponent
                updateFormData={updateFormData}
                videoFiles={formData.detailed.bannerVideo}
              />
              <Form.Text
                className="text-muted"
                style={{ fontSize: 10, fontWeight: 550, marginLeft: 200 }}
              >
                Accepted file types: MP4, MPEG, WEBM, MOV
              </Form.Text>
              <Form.Text
                className="text-muted"
                style={{ fontSize: 10, fontWeight: 550, marginLeft: 200 }}
              >
                *Maximum File Size: 1 GB
              </Form.Text>
            </div>
            <Button
              onClick={onDetailClick}
              style={{ marginLeft: 50, marginTop: 60, width: 180 }}
            >
              Preview Overview Card
            </Button>
          </Tab>
        </Tabs>
      </div>

      <Button type="submit" id="buttonSubmit">
        Submit
      </Button>
    </Form>
  );
}

export default MainForm;
