import React, { useState } from 'react';
import '../assets/App.css';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import moment from 'moment'

const getOpportunities = query => {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  return fetch(`https://search.torre.co/opportunities/_search/?q=${query}`, requestOptions)
}

const getPeople = query => {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  return fetch(`https://search.torre.co/people/_search/?q=${query}`, requestOptions)
}

const SingleCardPeople = props => (
  <Col sm="12" md="12" lg="6">
    <a style={{ margin: '5px' }} href={`https://bio.torre.co/en/${props.username}`}>
      <Card>
        <Card.Img variant="top" src={props.picture} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.professionalHeadline}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  </Col>
)
const SingleCardOpportunity = props => (
  <Col sm="12" md="12" lg="6">
    <Card style={{ margin: '5px' }}>
      <Card.Body>
        <Card.Text style={{ color: 'blue', fontSize: '14', fontWeight: 'bold' }}>{props.objective}</Card.Text>
        <Card.Text>{props.type}</Card.Text>
        <Card.Text>{moment(props.deadline).format('YYYY MM DD')}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
)
const App = () => {
  const [searchValue, setSearchValue] = useState({
    text: '',
    type: 'people'
  });

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const changeHandler = event => {
    if (event.target.name === 'text') {
      setSearchValue({ ...searchValue, text: event.target.value })
    } else if (event.target.name === 'category') {
      setSearchValue({ ...searchValue, type: event.target.value })
    }
  }

  const submitHandler = () => {
    if (searchValue.text.length > 1) {
      setIsLoading(true)
      if (searchValue.type === 'opportunity') {
        getOpportunities(searchValue.text)
          .then(response => response.json())
          .then(jsonResponse => {
            setData(jsonResponse.results)
          })
          .catch(error => setError(error))
          .finally(() => setIsLoading(false));

      } else if (searchValue.type === 'people') {
        getPeople(searchValue.text)
          .then(response => response.json())
          .then(jsonResponse => {
            setData(jsonResponse.results)
          })
          .catch(error => setError(error))
          .finally(() => setIsLoading(false));

      }
    } else {
      setError('You must enter a value into search field to search')
    }
  }

  return (
    <div className="App">
      <Container fluid="md">
        <Row>
          <Col sm="12" md="12" lg="6">
            <header className="App-header">
              <h3>Search for People and Opportunities on Torre</h3>
              <Form>
                <Form.Group controlId="">
                  <Form.Control name='text' type="text" placeholder="Search Jobs and Opportunities" value={searchValue.text} onChange={changeHandler} />
                </Form.Group>

                <Form.Group controlId="">
                  <Form.Control name='category' as="select" onChange={changeHandler}>
                    <option value='people'>People</option>
                    <option value='opportunity'>Opportunity</option>
                  </Form.Control>
                </Form.Group>

                <Form.Text style={{ color: 'red' }}>{error || error}</Form.Text>

                <Button variant="primary" onClick={submitHandler}>Submit</Button>
              </Form>
            </header>
          </Col>
          <Col sm="12" md="12" lg="6">
            {isLoading ? (<p style={{ margin: '0px auto', fontSize: '16', fontWeight: 'bold', color: 'red' }}>Loading...</p>) :
              (<Row>
                {data.map((value, index) => searchValue.type === 'opportunity' ?
                  (<SingleCardOpportunity key={index} objective={value.objective} type={value.type} deadline={value.deadline} />)
                  :
                  (<SingleCardPeople key={index} category={searchValue.type} name={value.name} picture={value.picture} professionalHeadline={value.professionalHeadline} username={value.username} />))}
              </Row>)
            }
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default App;
