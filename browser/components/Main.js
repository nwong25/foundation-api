import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Star from './Star';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      selectedOption: '',
      foundationsUsed: []
    };
  }

  async componentDidMount() {
    this.loadFoundationData();
    try {
      const { data } = await axios.get(
        `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation`
      );
      const list = data.map(product => ({
        label: product.name,
        value: product.name
      }));
      this.setState({ results: list });
    } catch (err) {
      console.error(err);
    }
  }

  async loadFoundationData() {
    try {
      const { data } = await axios.get(`/api/foundation/`);
      this.setState({ foundationsUsed: data });
    } catch (err) {
      console.error(err);
    }
  }

  async postFoundation(product) {
    try {
      await axios.post(`/api/foundation/`, {
        name: product
      });
      this.loadFoundationData();
    } catch (err) {
      console.error(err);
    }
  }

  async updateFoundation(id, rating) {
    try {
      await axios.put(`/api/foundation/${id}`, {
        rating: rating
      });
    } catch (err) {
      console.error(err);
    }
  }

  async deleteFoundation(id) {
    try {
      await axios.delete(`/api/foundation/${id}`);
      this.loadFoundationData();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const foundations = this.state.foundationsUsed || [];
    return (
      <div className="app">
        <div className="container">
          <div className="options">
            <div className="container">
              <h1>Foundations</h1>
            </div>
            <div className="container">
              <p>Selection the foundation you are current using:</p>
            </div>
            <Select
              options={this.state.results}
              onChange={product => {
                return (
                  this.setState({
                    selectedOption: product.label
                  }),
                  this.postFoundation(`${product.label}`)
                );
              }}
            />
            {foundations.length ? (
              <table>
                <tbody>
                  <tr>
                    <th>Foundation</th>
                    <th>Rating</th>
                  </tr>
                </tbody>
                <tbody>
                  {this.state.foundationsUsed.map(foundation => (
                    <tr key={foundation.id}>
                      <td className="foundation-name">{foundation.name}</td>
                      <td>
                        <Star
                          id={foundation.id}
                          rating={foundation.rating}
                          updateFoundation={this.updateFoundation}
                          loadFoundationData={this.loadFoundationData}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="myButton"
                          onClick={() => this.deleteFoundation(foundation.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
