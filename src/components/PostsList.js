import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { GH_PAGES_URL } from '../config'

const PostsList = ({ token }) => {
  const [postCounts, setPostCounts] = useState([])
  const [posts, setPosts] = useState([])
  const [load, setLoad] = useState(true)
  const [getCounts, setGetCounts] = useState(false)

  useEffect(() => {
    if (load) {
      axios.get(`${GH_PAGES_URL}/posts`,
        {
          headers: {
            'auth-token': token
          }
        })
        .then(res => {
          setPosts(res.data.data)
          setLoad(false)
          setGetCounts(true)
        })
        .catch(err => {
          console.log(err)
          setLoad(false)
        })
    }
    if (getCounts) {
      posts.forEach((item, index) => {
        axios.get(`${GH_PAGES_URL}/comments/${item.permalink}`,
          {
            params: {
              count: true
            },
            headers: {
              'auth-token': token
            }
          })
          .then(res => {
            const counts = postCounts
            counts[index] = res.data.data
            setPostCounts([...counts])
          })
          .catch(err => {
            console.log(err)
          })
      })
      setGetCounts(false)
    }
  }, [load, getCounts, token, postCounts, posts])

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Post name</th>
            <th>Comment count</th>
            <th>Comments allowed</th>
            <th>Comments hidden</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, index) => (
            <tr key={`post-${index}`}>
              <td>
                {item.permalink}
              </td>
              <td>
                {postCounts[index]}
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
          )
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default PostsList
