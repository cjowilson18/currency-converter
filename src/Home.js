import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus} from './utils';

const Currency = (props) => {
  const {
    amount,
    base,
    date,
    rates,s
  } = props.currency;

  return (
    <div className="row">
      <ul className='list-group'>
        <li className='list-group-item'>
            {amount}
        </li>
      </ul>
    </div>
  )
}

class CurrencyFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
      results: [ ],
      error: '',
    };

    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ selectValue: event.target.value});
  }

  handleSubmit(event) {
event.preventDefault();

    fetch(`https://api.frankfurter.app/latest?from=${this.state.selectValue}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        if (data.Response === 'False') {
            throw new Error(data.Error);
          } 
        this.setState({results: data.rates, error:''});
        console.log(data.rates);
    })
  }

  render() {
    const message='You chose '+ this.state.selectValue + ' as your Base Currency';
    const { selectValue, results, error } = this.state;
    

    return (
      <div className="container">
         <div className="row">
            <h1>RATES EXCHANGE TABLE</h1>
            <div className='col-12'>
                <form onSubmit={this.handleSubmit} className='form-inline my-4'>
                   <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text">Base Currency</label>
                </div>
                    <select value={this.state.selectValue} onChange={this.handleChange} className="custom-select" id="baseCurrency">
                        <option defaultValue>Choose...</option>
                        <option value="AUD">AUD</option>
                        <option value="BGN">BGN</option>
                        <option value="BRL">BRL</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                        <option value="CNY">CNY</option>
                        <option value="CZK">CZK</option>
                        <option value="DKK">DKK</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="HKD">HKD</option>
                        <option value="HRK">HRK</option>
                        <option value="HUF">HUF</option>
                        <option value="IDR">IDR</option>
                        <option value="ILS">ILS</option>
                        <option value="INR">INR</option>
                        <option value="ISK">ISK</option>
                        <option value="JPY">JPY</option>
                        <option value="KRW">KRW</option>
                        <option value="MXN">MXN</option>
                        <option value="MYR">MYR</option>
                        <option value="NOK">NOK</option>
                        <option value="NZD">NZD</option>
                        <option value="PHP">PHP</option>
                        <option value="PLN">PLN</option>
                        <option value="RON">RON</option>
                        <option value="RUB">RUB</option>
                        <option value="SEK">SEK</option>
                        <option value="SGD">SGD</option>
                        <option value="THB">THB</option>
                        <option value="TRY">TRY</option>
                        <option value="USD">USD</option>
                        <option value="ZAR">ZAR</option>
                    </select>
                </div> 
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
            
        </div>
        <div className='row'>
  <p>{message}</p>
  <table className='table'>
    <thead>
        <tr>
            <th scope='col'>Currency</th>
            <th scope='col'>Exchange Rate for 1 {this.state.selectValue}</th>
        </tr>
    </thead>
    <tbody>
        {Object.keys(results).map(currency => (
            <tr key={currency}>
                <td>{currency}</td>
                <td>{results[currency]}</td>
            </tr>
        ))}
    </tbody>
</table>
</div>
      
      </div>

      
    )
  }
}

export default CurrencyFinder;