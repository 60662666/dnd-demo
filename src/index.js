import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    state = {}
    render() {
        return (
            <div>
                <p>final success</p>
            </div>
        );
    }
}

export default App;

ReactDom.render(<App />, document.getElementById('root'));