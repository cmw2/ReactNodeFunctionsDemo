import React from 'react'

class About extends React.Component {
  componentDidMount() {
    document.title = 'React - About';
  }

  render() {
    return (
      <h1>About us</h1>
    )
  }
}

export default About;