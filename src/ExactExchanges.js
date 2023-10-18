import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import './index.css';
import Chart from 'chart.js';

class ExactExchanges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0.94,
            selectValue1: 'USD',
            selectValue2: 'EUR',
            currency1: 1,
            currency2: 1 * 0.94,
        };
        this.chartRef= React.createRef();
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleCurrency1Change = this.handleCurrency1Change.bind(this);
        this.handleCurrency2Change = this.handleCurrency2Change.bind(this);
    }
    componentDidMount() {
        this.getHistoricalRates('USD', 'EUR');
    }
    getHistoricalRates = (selectValue1, selectValue2) => {
        console.log(selectValue1 + " " + selectValue2);
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${selectValue1}&to=${selectValue2}`)
          .then(checkStatus)
          .then(json)
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[selectValue2]);
            const chartLabel = `${selectValue1}/${selectValue2}`;
            this.buildChart(chartLabels, chartData, chartLabel);
          })
          .catch(error => console.error(error.message));
          
      }
      buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");
        if (typeof this.chart !== "undefined") {
          this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
              }
            ]
          },
          options: {
            responsive: true,
          }
        })
      }


    handleChange1(event) {
        this.setState({ selectValue1: event.target.value }, () => {
           this.handleCurrency1Change(event); 
           this.getHistoricalRates(event.target.value, this.state.selectValue2);
        });
        
    }

    handleChange2(event) {
        this.setState({ selectValue2: event.target.value }, () => {
            this.handleCurrency1Change(event);
            this.getHistoricalRates(this.state.selectValue1, event.target.value)
        });
    }

    toCurrency1(amount, rate) {
        return amount * (1 / rate);
    }

    toCurrency2(amount, rate) {
        return amount * rate;
    }

    convert(amount, rate, equation) {
        const input = parseFloat(amount);
        if (Number.isNaN(input)) {
            return '';
        }
        return equation(input, rate).toFixed(3);
    }

    handleCurrency1Change(event) {
        fetch(`https://api.frankfurter.app/latest?from=${this.state.selectValue1}&to=${this.state.selectValue2}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        if (data.Response === 'False') {
            throw new Error(data.Error);
          } 
          const rate=data.rates[this.state.selectValue2];
        this.setState({rate});
    })


        const currency2 = this.convert(event.target.value, this.state.rate, this.toCurrency2);
        this.setState({
            currency1: event.target.value,
            currency2
        });
    }

    handleCurrency2Change(event) {
        const currency1 = this.convert(event.target.value, this.state.rate, this.toCurrency1);
        this.setState({
            currency2: event.target.value,
            currency1
        });
    }

    render() {
        const { rate, currency1, currency2 } = this.state;

        return (
            <div className="container border mt-5">
                <div className="text-center p-3 mb-2">
                    <h2 className="mb-2">Currency Converter</h2>
                    <h4>{this.state.selectValue1} 1 : {rate} {this.state.selectValue2}</h4>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <form className='form-inline my-4'>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">Base Currency</label>
                                </div>
                                <select value={this.state.selectValue1} onChange={this.handleChange1} className="custom-select" id="baseCurrency">
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
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">Converted Currency</label>
                                </div>
                                <select value={this.state.selectValue2} onChange={this.handleChange2} className="custom-select" id="baseCurrency">
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
                        </form>
                        <div className='mb-3'>
                            <span className="mr-1">{this.state.selectValue1}</span>
                            <input value={currency1} onChange={this.handleCurrency1Change} type="number" />
                            <span className="mx-3">=</span>
                            <input value={currency2} onChange={this.handleCurrency2Change} type="number" />
                            <span className="ml-1">{this.state.selectValue2}</span>
                        </div>
                        <canvas ref={this.chartRef} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ExactExchanges