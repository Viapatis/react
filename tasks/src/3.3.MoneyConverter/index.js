import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { rub: 0, eu: 0 }
    };
  }
  render() {
    const { rub, eu } = { ...this.state.values };
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money name={'rub'} changeValue={this.changeValue} value={rub} />
            &mdash;
            <Money name={'eu'} changeValue={this.changeValue} value={eu} />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }

  changeValue = (value, name) => {
    const values = { ...this.state.values };
    values[name] = value;
    values[name === 'rub' ? 'eu' : 'rub'] = name === 'rub' ? value / 70 : value * 70;
    this.setState({ values: values });
  };
}

class Money extends React.Component {

  render() {
    const { value } = { ...this.props };
    return (
      <input
        type="text"
        value={value}
        onChange={this.handleChangeValue}
      />
    );
  }
  handleChangeValue = (event) => {
    const { changeValue, name } = { ...this.props };
    const value = extractNumberString(event.target.value);
    changeValue(+value, name);
  }
}

Money.propTypes = {};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
