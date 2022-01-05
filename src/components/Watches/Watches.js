import React from 'react';
import FormWatches from './FormWatches/FormWatches';
import ItemWatches from './ItemWatches/ItemWatches';
import { nanoid } from 'nanoid';
import './watches.css';

const watchesDefaultValue = [
  {
    id: nanoid(),
    title: 'Москва',
    timezone: 3,
  },
  {
    id: nanoid(),
    title: 'Владивосток',
    timezone: 10,
  },
  {
    id: nanoid(),
    title: 'Нью Йорк',
    timezone: -5,
  },
  {
    id: nanoid(),
    title: 'Париж',
    timezone: 1,
  }
];

export default class Watches extends React.Component {
  constructor(props) {
    super(props)
    this.state = { watches: watchesDefaultValue };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd = (item) => {
    item.id = nanoid();
    this.setState((prevState) => ({ ...prevState, watches: [...prevState.watches, item] }));
  }

  handleDelete = (item) => {
    this.setState((prevState) => ({
      ...prevState,
      watches: prevState.watches.filter((prevItem) => prevItem.id !== item.id)
    }));
  }

  render() {
    return (
      <div className={'watches'}>
        <FormWatches handleAdd={this.handleAdd} />

        <div className={'watches__items'}>
          {this.state.watches.map((item) =>
            <ItemWatches
              key={item.id}
              item={item}
              handleDelete={this.handleDelete} />)}
        </div>
      </div>
    )
  }
}
