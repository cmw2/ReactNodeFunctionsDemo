import React from 'react'

class Contact extends React.Component {
  componentDidMount() {
    document.title = 'React - Contact';
  }

  render() {
      return (
        <h1>Contact us</h1>
      )
  }
}

export default Contact;