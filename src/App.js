import React, {Component} from 'react';
import { FaTwitter, FaQuoteLeft, FaWhatsapp } from 'react-icons/fa';
import './App.css';

const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

class App extends Component {
  constructor() {
    super(); 
      this.state = {
        quotes: [],
        index: 0
      }
      this.getRandomIndex = this.getRandomIndex.bind(this);
  }

  componentDidMount() {
    fetch(API).then(res => res.json()).then(res => {
      this.setState({
        quotes: res.quotes
      }, this.getRandomIndex);
    });
  }

  getRandomIndex() {
    const { quotes } = this.state;
    if(quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }
  
  render() {
    const { quotes, index } = this.state;

    const quote = quotes[index];

  if(quotes.length > 0) {
    return (
      <div className="App">
        <div className="App-header">
          <h1>"Random Quote Machine"</h1>
          <div className="quote-block">
            <p className="quote"><FaQuoteLeft size="1.2em"/> {quote.quote}"</p>
            <p className="author"><cite>- {quote.author}</cite></p>
            <div className= "btn">
              <div>
                <button><a href={encodeURI(`https://www.twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`)} target="_blank" rel="noopener noreferrer"><FaTwitter size="25px"/></a></button>
                <button><a href={encodeURI(`whatsapp://send/?text="${quote.quote}" - ${quote.author}`)} target="_blank" rel="noopener noreferrer"><FaWhatsapp size="25px"/></a></button>
              </div>
              <button onClick={this.getRandomIndex}>New Quote</button>
            </div>
          </div>
          <div className="footer">
            <footer>
              <p className="footer__text">
              © 2021 - Website developed by <a href="https://github.com/bishalmallick" target="_blank" rel="noopener noreferrer"> Bishal Mallick</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    );
  } else {
    return(<div className = "App-header">
      <h1>Loading</h1>
    </div>)
  }
}
}

export default App;
