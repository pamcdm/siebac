var CarSide = React.createClass({
  render: function() {
    return <section class="car-chooser">
      <h3>Escolha o seu carro</h3>
    </section>  
  }
});

var AlternativeSide = React.createClass({
  render: function() {
    return <section class="alternative-chooser">
      <h3>Agora, se você não tivesse um carro, o que você usaria no lugar?</h3>
    </section>  
  }
});

React.render(
  <div>   
    <CarSide/>
    <AlternativeSide/>
  </div>,
  document.getElementById('main')
);
