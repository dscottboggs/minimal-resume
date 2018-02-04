import React from 'react';
import ReactDOM from 'react-dom';
import { Sections, FooterLinks } from './content';
import { Header, Pane, Footer } from './components';

const dedent = require('dedent-js');
const dom = ReactDOM;

class DocumentRoot extends React.Component {
  sect(section) {
    if( section.text.typeof === "string" ){
      const pane = <Pane
        identifier={section.identifier}
        title={section.title}>{section.text}></Pane>;
      return pane;
    } else if (Array.isArray(section.text.typeof)) {
        section.map(function subsect(subsection){
          return sect(subsection);
        })
    } else {
        console.log( dedent`
          ERROR: Malformed child of ${section.title} follows:
            ${section.text}
          Type: ${typeof(section.text)}

          Children of sections should be either strings/JSX or an array
          of more sections.` )
        return <div id="errordiv"></div>
    }
  }
  render() {
    return (
      <div id="bodywrapper">
        <Header />
        <div id="intro" className="panel">{IntroText}</div>
        {this.props.sections.map(this.sect(section))}
        <Footer links={this.props.footerlinks} />
      </div>
    )
  }
}

dom.render(
  <DocumentRoot sections={Sections} footerlinks={FooterLinks} />,
  document.getElementById('doc')
);
