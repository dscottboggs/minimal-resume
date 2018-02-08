import React from 'react';
import ReactDOM from 'react-dom';
import { Sections, IntroText, FooterLinks } from './content';
import { Header, PaneParent, Footer } from './components';

const dedent = require('dedent-js');

class DocumentRoot extends React.Component {
    sect(section) {
        return (<PaneParent
            identifier={section.identifier}
            title={section.title}
            children={section.text}></PaneParent>
        )
    }
    render() {
        return (
            <div id="bodywrapper">
                <Header />  //The header
                <div id="intro" className="panel">{IntroText}</div>
                // ^^ the text at the top that doesn't really fit in a section
                {this.props.sections.map(this.sect(section))}  // a loop over all of the sections
                <Footer links={this.props.footerlinks} />    // the quick links section at the bottom
            </div>
        )
    }
}

ReactDOM.render(
  <DocumentRoot sections={Sections} footerlinks={FooterLinks} />,
  document.getElementById('doc')
);
