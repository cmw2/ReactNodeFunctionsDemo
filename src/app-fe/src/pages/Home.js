import React from 'react'

class Home extends React.Component {
  componentDidMount() {
    document.title = 'React - Home';
  }

  render() {
      return (
        <div>
          <h1>This is the home page</h1>
        </div>
        
      )
  }
}

export default Home;