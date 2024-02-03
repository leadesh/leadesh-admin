
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Axios from '../../axios'
import Swal from 'sweetalert2';
import { Routes } from "../../routes";


export default () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [Loading, setLoading] = useState(false);

  // console.log(email);
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios.post('/api/reseatPassword', { email: email });
      if (response.status === 200) {


        Swal.fire({
          icon: 'success',
          title: 'Email Send successfully',
          text: response?.data?.message
        }).then((result) => {
          if (result.isConfirmed) {

            history.push(Routes.Signin.path);
          }
        });


        // history.push(Routes.Presentation.path);
      }
      // console.log(response);
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Email Send Failed',
        text: 'Problem In Sending Email',
      });
    }




    setLoading(false)
  }
  return (


    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">
                  Reset password

                </h3>
                <Form>
                  {/* <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Mobile number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="tel"
                        placeholder="1234567890"
                        name="mobile"
                        value={mobile}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"  // Set a title for the pattern
                      />
                    </InputGroup>
                  </Form.Group> */}


                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email Id</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@gmail.com"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address"
                      />
                    </InputGroup>
                  </Form.Group>




                  {/* <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Confirm Password" />
                    </InputGroup>
                  </Form.Group> */}
                  <Button variant="primary" type="submit" className="w-100" onClick={resetPasswordHandler}>
                    {
                      Loading ? <>Loading...</> : <> Reset password </>
                    }
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
