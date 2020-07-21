import React from 'react';
import '../assets/App.css';
import { Button, Form } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Search Jobs" />
            <Form.Text className="text-muted">
              Do you need a better job.
    </Form.Text>
          </Form.Group>
        </Form>
        <Button variant="primary">Submit</Button>
      </header>
    </div>
  );
}

export default App;
