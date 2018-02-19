import React from 'react';

const dedent = require('dedent-js');
const paneTitleClass="panel-header";
const paneChildClass="panel";

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
                <PaneParent data={childPane}/>
            )
        }
    );
}

export class PaneParent extends React.Component {
    constructor (props) {
        super(props);
        console.log(`PaneParent: constructor reached for ${this.props.data.identifier} section.`);
        this.state = {open: false}
        this.flip = this.flip.bind(this)
        console.log(`PaneParent constructor completed. Current object status follows:`);
        console.log(`Props:\n${JSON.stringify(this['props'], null, 2)}`)
        console.log(`State:\n${JSON.stringify(this['state'], null, 2)}`);
    }
    flip () {
        if (this.state.open){
            console.log(`Panel ${this.props.data.identifier} is open, closing.`);
            this.setState({open: false});
        } else {
            console.log(`Panel ${this.props.data.identifier} is closed, opening.`);
            this.setState({open: true});
        }
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
                    onClick={this.flip}
                    children={getChildrenPanes(data.children)}
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
                    onClick={this.flip}
                    children={data.children}
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
            Title: ${props.title}`)
    //console.log(`Props for Pane:\n${JSON.stringify(props)}`);
    return (
        <div key={props.identifier} id={getPaneParentId(props.identifier)}>
            <div
                    className={paneTitleClass}
                    id={getPaneTitleId(props.identifier)}
                    onClick={props.onClick}
                >{props.title}
            </div>
            <PaneText
                id={getPaneChildId(props.identifier)}
                children={props.children}
                open={props.open}
            />
        </div>
    )
}

const PaneText = (props) => {
    if (props.open){
        return (
            <div id={props.id} className={paneChildClass}>
                {props.children}
            </div>
        );
    }
    return null
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
