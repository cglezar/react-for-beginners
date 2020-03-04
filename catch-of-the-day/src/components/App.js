import React from 'react';
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from '../base';

class App extends React.Component {

    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {

        const { params } = this.props.match;

        this.ref = base.syncState(`${ params.storeId }/fishes`, {
            context: this,
            state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef){
            this.setState({ order: JSON.parse(localStorageRef) });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {

        //  1. Take a copy of the existing state
        const fishes = { ...this.state.fishes };

        // 2. Add new fishes to that fishes variable
        fishes[`fish${ Date.now() }`] = fish;

        // 3 Set the new fishes object to state
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {

        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };

        // 2. Update state
        fishes[key] = updatedFish;
        this.setState( { fishes } );
    };

    deleteFish = (key) => {

        // 1. Take copy of state
        const fishes = { ...this.state.fishes };

        /**
         * Set fish to null for firebase to delete it.
         */
        fishes[key] = null;

        this.setState({ fishes });
    };

    loadSamplesFishes = () => {

        this.setState({
            fishes: sampleFishes
        })
    };

    addToOrder = key => {

        // 1. take a copy of state
        const order = { ...this.state.order };

        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;

        // 3. Call setSate to update our state object

        this.setState({ order });
    };

    removeFromOrder = key => {

        const order = { ...this.state.order };

        delete order[key];

        this.setState({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">s
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key =>{
                                return <Fish index={key}
                                             key={ key }
                                             details={ this.state.fishes[key] }
                                             addToOrder={ this.addToOrder }/>
                            })
                        }
                    </ul>
                </div>

                <Order fishes={ this.state.fishes }
                       order={ this.state.order }
                       removeFromOrder={ this.removeFromOrder }/>

                <Inventory addFish={ this.addFish }
                           updateFish={ this.updateFish }
                           deleteFish={ this.deleteFish }
                           loadSamplesFishes={ this.loadSamplesFishes }
                           fishes={ this.state.fishes } />
            </div>
        );
    }

}

export default App;