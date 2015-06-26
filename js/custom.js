var Grid = React.createClass({
  getInitialState: function(){
    return {
      ids: [[19, 8, 9], [18, 7, 2, 10], [17, 6, 1, 3, 11], [16, 5, 4, 12], [15, 14, 13]]
    };
  },
  getDefaultProps: function(){
    return {
      numbers: Array.apply(null, Array(19))
    };
  },
  render: function() {
    return (
      <div className="grid">
        {
          this.state.ids.map(function(row_ids, index){
            var numbers = row_ids.map(function(row_id) {
              return this.props.numbers[row_id - 1];
            }, this);
            return <Row key={index} ids={row_ids} numbers={numbers} counterVisible={this.state.countersVisible} inline={this.state.inlineRows} />;
          }, this)
        }
        <GridScore numbers={this.props.numbers} visible={this.props.showScore} />
      </div>
    );
  },
  randomFill: function() {
    this.setProps( { numbers: lodash.shuffle(lodash.range(1, 20)) } );
  },
  sequentialFill: function() {
    this.setProps( {
      numbers: [9,5,10,14,13,8,4,1,2,6,11,15,18,17,16,12,7,3,0]
    } );
  },
  showCounters: function() {
    this.setState( { countersVisible: true } );
  },
  randomSwap: function() {
    var indicesToSwap = lodash.sample(lodash.range(19), 2);
    var numbers = this.props.numbers;
    var temp = numbers[indicesToSwap[0]];
    numbers[indicesToSwap[0]] = numbers[indicesToSwap[1]];
    numbers[indicesToSwap[1]] = temp;
    this.setProps({ numbers: numbers });
  },
  setRowsToInline: function() {
    this.setProps({ numbers: lodash.range(19) });
    this.setState({ inlineRows: true, ids: [[1,2,3],[4,5,6,7],[8,9,10,11,12],[13,14,15,16],[17,18,19]] });
  },
});

var GridScore = React.createClass({
  getDefaultProps: function(){
    return {
      visible: false
    };
  },
  render: function() {
    return <div className="score">{this.calculateScore()}</div>;
  },
  calculateScore: function() {
    var lines = [
      [0, 1, 2],
      [3, 4, 5, 6],
      [7, 8, 9, 10, 11],
      [12, 13, 14, 15],
      [16, 17, 18],
      [0, 3, 7],
      [1, 4, 8, 12],
      [2, 5, 9, 13, 16],
      [6, 10, 14, 17],
      [11, 15, 18],
      [7, 12, 16],
      [3, 8, 13, 17],
      [0, 4, 9, 14, 18],
      [1, 5, 10, 15],
      [2, 6, 11],
    ];
    if (!this.props.visible) {
      return null;
    } else {
      var tally = 0;
      for (var i = 0; i < lines.length; i++) {
        var sum = 0;
        for (var j = 0; j < lines[i].length; j++) {
          sum += this.props.numbers[lines[i][j]];
        }
        tally += Math.abs(sum - 38);
      }
      return tally;
    }
  }
});

var GridSet = React.createClass({
  getInitialState: function(){
    return {
      numbers: [
        lodash.shuffle(lodash.range(1, 20))
      ],
    };
  },
  render: function() {
    return (
      <div className="gridset">
        {
          this.state.numbers.map(function(numbers, index){
            return <Grid key={index} ref={'grid' + index} numbers={numbers} showScore={true} />;
          })
        }
      </div>
    );
  },
  duplicateGrid: function(n) {
    this.setState({
      numbers: lodash.times(n, function(){ return lodash.first(this.state.numbers); }, this)
    });
  },
  shuffleChildren: function() {
    var newNumbers = this.state.numbers.slice();
    var swap = function(i, gridset) {
      var numbers = gridset.state.numbers[i].slice();
      var indicesToSwap = lodash.sample(lodash.range(19), 2);
      var temp = numbers[indicesToSwap[0]];
      numbers[indicesToSwap[0]] = numbers[indicesToSwap[1]];
      numbers[indicesToSwap[1]] = temp;
      newNumbers[i] = numbers;
      gridset.setState({ numbers: newNumbers });
    };
    for (var i = 0; i < this.state.numbers.length; i++) {
      setTimeout(swap, i * 100, i, this);
    }
  },
  copyBest: function() {
    var bestNumbers = lodash.min(this.state.numbers, function(numbers) {
      var lines = [
        [0, 1, 2],
        [3, 4, 5, 6],
        [7, 8, 9, 10, 11],
        [12, 13, 14, 15],
        [16, 17, 18],
        [0, 3, 7],
        [1, 4, 8, 12],
        [2, 5, 9, 13, 16],
        [6, 10, 14, 17],
        [11, 15, 18],
        [7, 12, 16],
        [3, 8, 13, 17],
        [0, 4, 9, 14, 18],
        [1, 5, 10, 15],
        [2, 6, 11],
      ];
      var tally = 0;
      for (var i = 0; i < lines.length; i++) {
        var sum = 0;
        for (var j = 0; j < lines[i].length; j++) {
          sum += numbers[lines[i][j]];
        }
        tally += Math.abs(sum - 38);
      }
      return tally;
    });
    this.setState(
      {numbers: lodash.times(this.state.numbers.length, function(){ return bestNumbers; }) }
    );
  }
});

var Row = React.createClass({
  render: function() {
    if (!this.props.inline) {
      return (
        <div className="row">
          {
            this.props.ids.map(function(tile_id, index){
              return <Tile key={index} id={tile_id} number={this.props.numbers[index]} />;
            }, this)
          }
          <RowCounter numbers={this.props.numbers} visible={this.props.counterVisible}/>
        </div>
      );
    } else {
      return (
        <div className="row inline">
          {
            this.props.ids.map(function(tile_id, index){
              return <Tile key={index} id={tile_id} number={this.props.numbers[index]} />;
            }, this)
          }
        </div>
      );

    }
  }
});

var RowCounter = React.createClass({
  render: function() {
    var sum = lodash.sum(this.props.numbers);
    if (this.props.visible) {
      if (sum == 38) {
        return <div className="counter visible correct">{sum}</div>;
      } else {
        return <div className="counter visible">{sum}</div>;
      }
    } else {
      return <div className="counter">{sum}</div>;
    }
  }
});

var Tile = React.createClass({
  render: function() {
    if (this.props.number == null) {
      return (
        <div className={"tile tile-" + this.props.id.toString()}>
          <div className="hexagon">&#x2B22;</div>
        </div>
      );
    } else {
      return (
        <div className={"tile tile-" + this.props.id.toString()}>
          <div className="hexagon">&#x2B22;</div>
          <div ref="number" className="number">{this.props.number}</div>
        </div>
      );
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    var prevNumber = prevProps.number;
    var number = this.props.number;
    if (prevNumber && prevNumber != number) {
      var node = React.findDOMNode(this.refs.number);
      node.classList.add('flashed');
      node.addEventListener('transitionend', function( e ){
        return e.target.classList.remove('flashed');
      });
    }
  }
});

var grid1 = React.render(
  <Grid />,
  document.getElementById('grid-1')
);

var grid2 = React.render(
  <Grid />,
  document.getElementById('grid-2')
);

var gridset = React.render(
  <GridSet />,
  document.getElementById('gridset')
);

Reveal.addEventListener( 'fragmentshown', function( event ) {
  switch (event.fragment.id) {
    case 'grid-1-fill':
      return grid1.randomFill();
    case 'grid-1-show-counters':
      return grid1.showCounters();
    case 'grid-1-shuffle':
      activeInterval = window.setInterval(grid1.randomSwap, 500);
      break;
    case 'grid-1-shuffle-fast':
      window.clearInterval(activeInterval);
      activeInterval = window.setInterval(grid1.randomSwap, 10);
      break;
    case 'grid-1-shuffle-stop':
      window.clearInterval(activeInterval);
      break;
    case 'grid-2':
      grid2.sequentialFill();
      break;
    case 'grid-2-inline':
      grid2.setRowsToInline();
      break;
    case 'gridset-duplicate':
      gridset.duplicateGrid(3);
      break;
    case 'gridset-shuffle-step-1':
      gridset.shuffleChildren();
      break;
    case 'gridset-shuffle-step-2':
      gridset.copyBest();
      break;
    case 'gridset-shuffle':
      var evolve = function() {
        gridset.shuffleChildren();
        setTimeout(gridset.copyBest, 1500);
      };
      evolve();
      activeInterval = setInterval(evolve, 3000);
      break;
    case 'gridset-shuffle-fast':
      window.clearInterval(activeInterval);
      var evolve = function() {
        gridset.shuffleChildren();
        setTimeout(gridset.copyBest, 800);
      };
      evolve();
      activeInterval = setInterval(evolve, 1000);
      break;
    case 'gridset-shuffle-stop':
      window.clearInterval(activeInterval);
      break;
  }
} );
