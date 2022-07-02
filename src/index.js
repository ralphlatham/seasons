import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import './style/App.css'

//const App = () => {
//    window.navigator.geolocation.getCurrentPosition(
//        (position) => console.log(position),
//        (err) => console.log(err)
//    );

//    return <div>Latitude: </div>;
//};

class App extends React.Component {
    //constructor(props) {
    //    super(props);

    //    // THIS IS THE ONLY TIME we do direct assignment to this.state
    //    this.state = { lat: null, errorMessage: '' };

    //    window.navigator.geolocation.getCurrentPosition(
    //        position => {
    //            // We called setState!!!
    //            this.setState({ lat: position.coords.latitude })

    //            // DO NOT DO THIS!! 
    //            // this.state.lat = position.coords.latitude
    //        },
    //        err => {
    //            this.setState({ errorMessage: err.message });
    //        }
    //    );
    //};

    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    };

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            //return <div>Latitude: {this.state.lat}</div>;
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request" />;
    };

    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);