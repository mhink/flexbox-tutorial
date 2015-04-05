/** @jsx React.DOM **/

var React           = require("react");
var Reflux          = require("reflux");
var PureRenderMixin = require("react/addons").addons.PureRenderMixin;
var TutorialStore   = require("../stores/FlexboxTutorialStore");
var SelectBox       = require("react-select-box");

var FlexboxTutorial = exports.FlexboxTutorial = React.createClass({
  displayName: "FlexboxTutorial", 

  mixins: [Reflux.listenTo(TutorialStore, 'onTutorialChange')],

  getInitialState: function() {
    return TutorialStore.getState();
  },

  onTutorialChange: function(stateChange) {
    this.setState(stateChange);
  },

  render: function() {
    return (
      <div className="section-1">
        <h1>An Interactive Flexbox</h1>
        <div className={this._getClasses()}>
          <div className="flex-item raised"><p>One</p></div>
          <div className="flex-item"><p>Two</p></div>
          <div className="flex-item dropped"><p>Three</p></div>
        </div>
      </div>
    );
  },
  _getClasses: function() {
    var cx = React.addons.classSet;
    var classes = {};
    classes['flex-container'] = true;
    classes[this.state.writingMode] = true;
    classes[this.state.flexDirection] = true;
    classes[this.state.justifyContent] = true;
    classes[this.state.alignItems] = true;
    return cx(classes);
  },
});

var TutorialControls = exports.TutorialControls = React.createClass({
  mixins: [Reflux.listenTo(TutorialStore, 'onTutorialChange')],

  getInitialState: function() {
    return TutorialStore.getState();
  },

  onTutorialChange: function(stateChange) {
    this.setState(stateChange);
  },

  render: function() {
    return (
      <div className="knobs">
        <h1>Controls</h1>
        <hr />
        <p>Flex Direction</p>
        <SelectBox 
          label="Flex Direction"
          onChange={this.handleFlexDirectionChange}
          value={this.state.flexDirection}>
          <option value="fd-row">row</option>
          <option value="fd-col">column</option>
          <option value="fd-row-r">row-reverse</option>
          <option value="fd-col-r">column-reverse</option>
        </SelectBox>

        <p>Writing Mode</p>
        <SelectBox 
          label="Writing Mode"
          onChange={this.handleWritingModeChange}
          value={this.state.writingMode}>
          <option value="wm-htb">horizontal-tb</option>
          <option value="wm-vrl">vertical-rl</option>
          <option value="wm-vlr">vertical-lr</option>
        </SelectBox>

        <p>Justify Content</p>
        <SelectBox 
          label="Justify Content"
          onChange={this.handleJustifyContentChange}
          value={this.state.justifyContent}>
          <option value="jc-fs">flex-start</option>
          <option value="jc-fe">flex-end</option>
          <option value="jc-c">center</option>
          <option value="jc-sb">space-between</option>
          <option value="jc-sa">space-around</option>
        </SelectBox>

        <p>Align Items</p>
        <SelectBox 
          label="Align Items"
          onChange={this.handleAlignItemsChange}
          value={this.state.alignItems}>
          <option value="ai-fs">flex-start</option>
          <option value="ai-fe">flex-end</option>
          <option value="ai-c">center</option>
          <option value="ai-s">stretch</option>
          <option value="ai-b">baseline</option>
        </SelectBox>

      </div>
    );
  },
  handleFlexDirectionChange: function(x) {
    TutorialStore.setFlexDirection(x);
  },

  handleWritingModeChange: function(x) {
    TutorialStore.setWritingMode(x);
  },
  handleJustifyContentChange: function(x) {
    TutorialStore.setJustifyContent(x);
  },
  handleAlignItemsChange: function(x) {
    TutorialStore.setAlignItems(x);
  }

});

var Compass = React.createClass({
  render: function() {
    return (
      <div className="compass">
        <div className="main-axis" />
        <div className="cross-axis" />
      </div>
    );
  }
});
