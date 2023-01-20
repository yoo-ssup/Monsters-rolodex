import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';


const App = () => {
  const [ searchField, setSearchField ] = useState(''); //[value, setValue]
  const [ monsters, setMonsters ] = useState([]);
  const [ filt, setFilterMonsters ] = useState(monsters);

  console.log('rendered');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);  //(Callback_function,Array_of_dependencies)

  useEffect(() =>{
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  },[monsters,searchField]);

  const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();       
        setSearchField(searchFieldString);
  };

  return (
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>    
        <SearchBox 
          onChangeHandler = {onSearchChange} 
          placeholder='Search for monsters' 
          className='monsters-search-box' 
        />        
        <CardList monsters={filt} />
      </div>
  )
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users};
//       })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();       

//     this.setState(() => {
//       return {searchField};
//       });
//   }

//   render() {
//     // console.log('render from AppJS')
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filt = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox onChangeHandler = {onSearchChange} placeholder='Search for monsters' className='monsters-search-box' />
//         {/* {
//           filt.map((monster) => {
//             return <div key={monster.id}><h1>{monster.name}</h1></div>
//         })} */}
//         <CardList monsters={filt} />
//       </div>
//     );
//   }
// }

export default App;
