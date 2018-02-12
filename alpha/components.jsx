import React from 'react';
import PropTypes from 'prop-types';

const dedent = require('dedent-js');
const paneTitleClass="panel-header";
const paneChildClass="panel";

export const Header = (props) => {
    console.log("Rendering page header.");
    return (
        <div id="header">
            {props.name}<br />
            {props.email}<br />
            {props.phone}
        </div>
    )
}

Header.propTypes = {
    name : PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
}

const getChildrenPanes = (children) => {
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

getChildrenPanes.propTypes = {
    children: PropTypes.array
}

export class PaneParent extends React.Component {
    constructor (props) {
        super(props);
        console.log(`PaneParent: constructor reached for ${this.props.data.identifier} section.`);
        this.state = {open: false}
        this.flip = this.flip.bind(this)
        console.log("PaneParent constructor completed.");
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
        console.log(dedent `
            Calling for render of Pane for:
                ID/Key: ${this.props.data.identifier}
                Title: ${this.props.data.title}
                Child (text): ${this.props.data.children}`)
        return (
            <Pane
                identifier={this.props.data.identifier}
                title={this.props.data.title}
                onclick={this.flip}
                children={this.props.data.children}
                expanded={this.state.open}
                hasChildPanes={this.props.this.props.data.hasChildPanes}
            />
        );
    }
}

const getPaneParentId = (identifier) => `panel_wrapper_${identifier.replace(' ', '')}`
const getPaneTitleId = (identifier) => `panel_header_${identifier.replace(' ', '')}`
const getPaneChildId = (identifier) => `panel_${identifier.replace(' ', '')}`
const getPaneTitle = (expanded, title) => expanded? `${title}+`: `${title}-`

const Pane = (props) => {
    console.log(dedent `
        Rendering Pane for:
            ID/Key: ${props.identifier}
            Title: ${props.title}`)
    if (props.hasChildPanes){
        console.log(`Panel ${props.identifier} has child panes.`);
        // The hasChildPanes option is used to note that the pane has subpanes
        return (
            <div id={getPaneParentId(props.identifier)}>
                <div
                        id={getPaneTitleId(props.identifier)}
                        className={paneTitleClass}
                        onClick={props.onClick}
                    >{getPaneTitle(props.expanded, props.title)}
                </div>
                {getChildrenPanes(props.children)}
            </div>
        )
    }
    return (
        <div id={getPaneParentId(props.identifier)}>
            <div
                    id={getPaneTitleId(props.identifier)}
                    className={paneTitleClass}
                    onClick={props.onClick}
                >{getPaneTitle(props.expanded, props.title)}
            </div>
            <PaneText
                id={getPaneChildId(props.identifier)}
                children={props.children}
                expanded={props.expanded}
            />
        </div>
    )
}

Pane.propTypes = {
    identifier: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    expanded: PropTypes.bool,
    children: PropTypes.object
}

const PaneText = (props) => {
    if (props.expanded){
        return (
            <div id={props.identifier} className={paneChildClass}>
                {props.children}
            </div>
        );
    }
    return null
}

PaneText.propTypes = {
    identifier: PropTypes.string,
    expanded: PropTypes.bool,
    children: PropTypes.element
}

export const Footer = (props) => {
    console.log("Rendering page footer.")
    return(
        <div className="footer">
            <div id="footer-title">Quick Links</div>
            <br />
            { props.links.map(
                function(link) {
                    return (
                        <a
                                href={link.link}
                                target="_blank"
                                className="footlink"
                                id={`footer_link_${link.text.replace(' ', '')}`}
                            >{link.text}
                        </a>
                    )
                }
            )}
        </div>
    )
}

Footer.propTypes = {
    links: PropTypes.array
}
