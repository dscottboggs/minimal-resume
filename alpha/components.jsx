import React from 'react';

export class Header extends React.Component{
  get name() => <h1 className='header' id='name'>D. Scott Boggs, Jr.</h1>
  get email() => <h3 className='header' id='email'>scott@tams.tech</h3>
  get phone() => <h3 className='header' id='phone'>(724) 393 - 5536</h3>
  render () {
    <head id="header">
          {this.name}<br />
          {this.email}<br />
          {this.phone}
    <title name='site-title'>{this.name} - Resume</title>
    </head>
  }
}

export class Pane extends React.Component {
  constructor (properties) {
    super(properties);
    this.state = {'open': false}
  }
  flip () {
    if (this.state.open){
      // close it
      this.state.open = false;
    } else {
      // open it
      this.state.open = true;
    }
  }
  render() {
    return (
      <div
        id=panel_header_{this.props.identifier}
        className="panel-header">{this.props.title} + (
          {this.props.open}? "-": "+"
        )</div>
      {<div
        id=props_{this.props.identifier}
        className="panel">{this.props.children}</div> && this.state.open}
    );
  }
};

export class Footer extends React.Component {
  render() {
    <div className="footer">
      <div id="footer-title">Quick Links</div><br />
      { this.props.links.map(
        function(link) {
          return <a
            href={link.link}
            target="_blank"
            className="footlink"
            id={link.text}>{link.text}</a>
          }
        );
      }
    </div>
  }
}
