import React from 'react';
import ReactDOM from 'react-dom';
import { Header as Head, Sections } from './content';
import { Header, MainBody } from './components';

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
        return <PaneParent data={section} key={section.identifier} />
    }
    render() {
        console.log("DocumentRoot.render: Beginning rendering of document root");
        return (
            <div id="bodywrapper">
                <Header
                    name={this.props.Head.name}
                    phone={this.props.Head.phoneNumber}
                    email={this.props.Head.email}/>
                <MainBody bodies={this.props.Sections} />
            </div>
        );
    }
}

ReactDOM.render(
  <DocumentRoot Sections={Sections} Head={Head}/>,
  document.getElementById('doc')
);
