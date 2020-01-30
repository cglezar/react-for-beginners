import React from 'react';
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {

        //  1. Take a copy of the existing state
        const fishes = { ...this.state.fishes };

        // 2. Add new fishes to that fishes variable
        fishes[`fish${ Date.now() }`] = fish;

        // 3 Set the new fishes object to state
        this.setState({ fishes });
    };

    loadSamplesFishes = () => {

        this.setState({
            fishes: sampleFishes
        })
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        { Object.keys(this.state.fishes).map(key => <Fish key={ key } details={ this.state.fishes[key] } />) }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={ this.addFish } loadSamplesFishes={ this.loadSamplesFishes }/>
            </div>
        );
    }

}

export default App;