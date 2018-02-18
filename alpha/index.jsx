import React from 'react';
import ReactDOM from 'react-dom';
import { Header as Head, Sections, IntroText, FooterLinks } from './content';
import { Header, PaneParent, Footer } from './components';

const dedent = require('dedent-js');


class DocumentRoot extends React.Component {
    constructor(props) {
        console.log("DocumentRoot constructor reached");
        super(props);
        this.sect = this.sect.bind(this);
        console.log("DocumentRoot constructor completed.");
    }
    sect(section) {
        console.log(`DocumentRoot.sect: Identifier/Key: ${section.identifier}`);
        return <PaneParent data={section} />
    }
    render() {
        console.log("DocumentRoot.render: Beginning rendering of document root");
        return (
            <div id="bodywrapper">
                <Header name={Head.name} phone={Head.phoneNumber} email={Head.email}/>
                <div id="intro" />
                <div id="mainbodywrapper">
                    {this.props.sections.map((section) => this.sect(section))}
                </div>
                <Footer links={this.props.footerlinks}/>
            </div>
        );
    }
}

ReactDOM.render(
  <DocumentRoot sections={Sections} footerlinks={FooterLinks} />,
  document.getElementById('doc')
);
