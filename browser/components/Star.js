import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class Star extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.rating
    };
  }

  onStarClick(nextValue, prevValue, name) {
    return (
      this.setState({ rating: nextValue }),
      this.props.updateFoundation(this.props.id, nextValue)
    );
  }

  render() {
    return (
      <div>
        <StarRatingComponent
          name="rating"
          starCount={5}
          starColor="#000000"
          emptyStarColor="#FFFFFF"
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default Star;
