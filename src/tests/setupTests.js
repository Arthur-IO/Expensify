import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configures Enzyme a library created by AirBnB for full component testing

Enzyme.configure({
    // All enzyme requires is an adapter with the current react version for functionality
    adapter: new Adapter()
})