import React from 'react';
import Order from './Order';

class Orders extends React.Component {
    render() {
        return (          
          <div>
            <ol>
              <li>
                <Order />
              </li>
              <li>
                <Order />
              </li>
            </ol>
          </div>         
        )
    }
}

export default Orders;