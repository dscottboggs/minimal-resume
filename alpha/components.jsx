import React from 'react';
import { panelStyle } from './styles.jsx';

const dedent = require('dedent-js');
const paneTitleClass="panel-header";
const paneChildClass="panel";
const hiddenPaneChildClass="panel_hide";
const defaultState={
  open: false,
  childClass: hiddenPaneChildClass
}
const visibleState={
  open: true,
  childClass: paneChildClass
}

export const Header = (props) => {
    console.log("Rendering page header.");
    return (
        <div id="header">
            <h1>
                {props.name}<br />
            </h1>
            <h3>
                {props.email}<br />
                {props.phone}
            </h3>
        </div>
    )
}

const getChildrenPanes = (children) => {
    if (!children.type === 'array'){
        console.log(`ERROR: Array of children is not an array, it is ${children.type}`);
        return null;
    }
    return children.map(
        // in that case, PaneParents are recursively created for each
        // subPanel
        (childPane) => {
            console.log(`Calling for creation of child pane ${childPane.identifier}`);
            return (
                <PaneParent data={childPane} key={childPane.identifier}/>
            )
        }
    );
}

export class PaneParent extends React.Component {
    constructor (props) {
        super(props);
        console.log(`PaneParent: constructor reached for ${this.props.data.identifier} section.`);
        this.state = {
          componentClasses: hiddenPaneChildClass,
          open: false
        }
        this.toggleState = this.toggleState.bind(this)
        console.log(`PaneParent constructor completed. Current object status follows:`);
        console.log(`Props:\n${JSON.stringify(this['props'], null, 2)}`)
        console.log(`State:\n${JSON.stringify(this['state'], null, 2)}`);
    }
    toggleState () {
        console.log(`Panel ${this.props.data.identifier} is ${
          this.state.open? "open, closing": "closed, opening."
        }.`);
        this.setState(this.state.open? defaultState: visibleState);
    }
    render() {
        const data = this.props.data;
        if (data.hasChildPanes){
            console.log(`Panel ${data.identifier} has child panes.`);
            // The hasChildPanes option is used to note that the pane has subpanes
            return (
                <Pane
                    className="childPanes"
                    identifier={data.identifier}
                    title={data.title}
                    onClick={this.toggleSate}
                    children={getChildrenPanes(data.children)}
                    childClass={this.state.childClass}
                    open={this.state.open}
                />
            )
        }else {
            console.log(dedent `
                Calling for render of Pane for:
                    Identifier: ${data.identifier}
                    Title: ${data.title}
                    Child (text): ${data.children}`)
            return (
                <Pane
                    identifier={data.identifier}
                    title={data.title}
                    onClick={this.toggleSate}
                    children={data.children}
                    childClass={this.state.childClass}
                    open={this.state.open}
                />
            );
        }
    }
}

const getPaneParentId = (identifier) => `panel_wrapper_${identifier.replace(' ', '')}`
const getPaneTitleId = (identifier) => `panel_header_${identifier.replace(' ', '')}`
const getPaneChildId = (identifier) => `panel_${identifier.replace(' ', '')}`

const Pane = (props) => {
    console.log(dedent `
        Rendering Pane for:
            Identifier: ${props.identifier}
            Title: ${props.title}
        ${props.open? "...with": "...without"} content.`)
    return (
        <div id={getPaneParentId(props.identifier)}>
            <div
                    className={paneTitleClass}
                    id={getPaneTitleId(props.identifier)}
                    onClick={props.onClick}
                >{props.title}
            </div>
            <div
                id={getPaneChildId(props.identifier)}
                children={props.children}
                className={props.childClass}
            >{props.children}</div>
        </div>
    )
}

export const Footer = (props) => {
    console.log("Rendering page footer.")
    return(
        <div className="footer">
            <div id="footer-title">Quick Links</div>
            <br />
            { props.links.map(
                function(link) {
                    console.log(`Rendering footer link ${link.text} to ${link.link}`)
                    let identifier = link.text.replace(' ', '')
                    return (
                        <a
                                key={identifier}
                                href={link.link}
                                target="_blank"
                                className="footlink"
                                id={`footer_link_${identifier}`}
                            >{link.text}
                        </a>
                    )
                }
            )}
        </div>
    )
}
