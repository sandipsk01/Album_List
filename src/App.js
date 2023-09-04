import { Provider } from 'react-redux';
import './App.css';
import AddAlbum from './components/addAlbum';
import AlbumList from './components/list';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AddAlbum />
        <AlbumList />
      </Provider>
    </div>
  );
}

export default App;
