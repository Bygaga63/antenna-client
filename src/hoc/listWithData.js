import React from "react";
import Spinner from "../components/Spinner";

const listWithData = (Component, type) => {
  return class extends React.Component {
    state = {
      data: null
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    componentDidMount() {
      this.update();
    }

    update() {
      this.props.getData()
        .then((data) => {
          this.setState({
            data
          });
        });
    }

    render() {
      const {data} = this.state;

      if (!data) {
        return <Spinner/>
      }

      return <Component {...this.props} data={data} type={type}/>
    }
  }
};


export default listWithData;
