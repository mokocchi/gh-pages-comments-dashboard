import React from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'

const PostsList = () => {
  return (
    <div>
      <Table striped>
        <thead>
          <td>Post name</td>
          <td>Comment count</td>
          <td>Comments allowed</td>
          <td>Comments hidden</td>
          <td>Action</td>
        </thead>
        <tbody>
          <tr>
            <td>
              Post 1
            </td>
            <td>
              0
            </td>
            <td>
              <Form.Select>
                <option>disallow</option>
                <option>allow</option>
              </Form.Select>
            </td>
            <td>
              <Form.Select>
                <option>hide</option>
                <option>show</option>
              </Form.Select>
            </td>
            <td>
              <Row>
                <Col className='d-flex justify-content-end'>
                  <Button className='me-3' variant='warning'>
                    Update
                  </Button>
                  <Button className='' variant='danger'>
                    Delete
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default PostsList
