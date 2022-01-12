import view from './view.js';
import previewView from './previewView.js';

class ResultsView extends view {
  _parentElemnt = document.querySelector('.results');
  _errorMessage = 'the search have not product results!';
  _message = '';

  displayNumberOfResults(data) {
    console.log(data);
    const placeholder = document.querySelector(
      'body > div.container > header > form > input'
    );

    placeholder.placeholder = `${data.length} results`;
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
