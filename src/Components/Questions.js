import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import './Questions.css';

export default function Questions() {
  return (
    <div className="card-rows">
      <MDBCard style={{ maxWidth: '500px' }}>
        <MDBRow className="g-0">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
              alt="..."
              fluid
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
      <MDBCard style={{ maxWidth: '500px' }}>
        <MDBRow className="g-0">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp"
              alt="..."
              fluid
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </div>
  );
}