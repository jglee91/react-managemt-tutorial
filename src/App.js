import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';

const customers = [{
  id: 1,
  image: 'https://placeimg.com/64/64/1',
  name: '홍길동',
  birth: '961222',
  gender: '여자',
  job: '대학생'
},
{
  id: 2,
  image: 'https://placeimg.com/64/64/2',
  name: '이준규',
  birth: '911116',
  gender: '남자',
  job: '프로그래머'
},
{
  id: 3,
  image: 'https://placeimg.com/64/64/3',
  name: '임꺽정',
  birth: '961222',
  gender: '남자',
  job: '디자이너'
}

]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map((customer) => {
            return (
              <Customer
                key={customer.id}
                id={customer.id}
                image={customer.image}
                name={customer.name}
                birthday={customer.birth}
                gender={customer.gender}
                job={customer.job}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
