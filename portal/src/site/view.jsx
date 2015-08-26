import React from 'react';

class CarBuyForm extends React.Component {
  render () {
    return (
      <fieldset className={this.props.className}>
        <legend>Aquisição de Veículo</legend>
        <input placeholder="Valor do veículo" type="number" min="5000" step="1000"/>      
        <input placeholder="Número de prestações" type="number" min="1" max="120" step="1"/>
        <input placeholder="Taxa de juros" type="number" min="0.5" max="10" step="0.01"/>      
        <input placeholder="Valor das pretações" type="number" min="0.5" max="10" step="0.01"/>      
      </fieldset>
    );
  }
}

class CarMaintenanceForm extends React.Component {
  render () {
    return (
      <fieldset className={this.props.className}>
        <legend>Manutenção</legend>
        <input placeholder="Estimativa combustível" type="number" min="100" max="1000" step="100"/>      
        <input placeholder="Seguro anual" type="number" min="100" max="10000" step="100"/>      
        <input placeholder="Manutenção anual" type="number" min="100" max="10000" step="100"/>      
        <input placeholder="Estacionamento" type="number" min="10" max="2000" step="10"/>      
      </fieldset>
    );
  }
}

class CarSide extends React.Component {
  render () {
    return (
      <section className="car-chooser">
        <h3>Configure o seu carro</h3>
        <div className="grid">
          <CarBuyForm className="col-1-2" />
          <CarMaintenanceForm className="col-1-2" />
        </div>
      </section>
    );
  }
}

class TaxiForm extends React.Component {
  render () {
    return (
      <fieldset className={this.props.className}>
        <legend>Taxi</legend>
        <input placeholder="Corridas por mês" type="number" min="1" max="120" step="1"/>      
        <input placeholder="Valor médio das corridas" type="number" min="5" max="150" step="5"/>      
      </fieldset>
    );
  }
}

class BusForm extends React.Component {
  render () {
    return (
      <fieldset className={this.props.className}>
        <legend>Ônibus ou Trem</legend>
        <input placeholder="Quantidade de passagens" type="number" min="1" max="120" step="1"/>      
        <input placeholder="Valor das passagens" type="number" min="0.50" max="50" step="0.10"/>      
      </fieldset>
    );
  }
}

class RentForm extends React.Component {
  render () {
    return (
      <fieldset className={this.props.className}>
        <legend>Aluguel de Veículo</legend>
        <input placeholder="Diárias por mês" type="number" min="1" max="120" step="1"/>      
        <input placeholder="Valor das diárias" type="number" min="1" max="120" step="1"/>      
        <input placeholder="Estimativa Gasolina" type="number" min="100" max="1000" step="100"/>      
      </fieldset>
    );
  }
}

class AlternativeSide extends React.Component {
  render () {
    return (
      <section className="alternative-chooser">
        <h3>Agora, se você não tivesse um carro, o que você usaria no lugar?</h3>
        <div className="grid">
          <BusForm className="col-1-3"/> 
          <TaxiForm className="col-1-3"/> 
          <RentForm className="col-1-3"/>
        </div>
      </section>
    );
  }
}

class Submit extends React.Component {
  render () {
    return (
      <div className="submit-wrapper">
        <button type="button">Vai!</button>
      </div>
    );
  }
}

export default function render () {
  React.render(
    <form>
      <CarSide />
      <AlternativeSide />
      <Submit />
    </form>,
    document.getElementById('main')
  );
}
