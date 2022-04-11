import { React, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import PostsList from '../components/PostsList'
import { GH_PAGES_NAME } from '../config'

function Home () {
  return (
    <Container>
      <Row>
        <Col>
          <h2>
            GitHub Pages comments dashboard for {GH_PAGES_NAME}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col style={{ border: '1px solid black', padding: '2em' }}>
          <Row>
            <Col>
              <PostsList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
