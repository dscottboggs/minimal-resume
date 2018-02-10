import React from 'react';

const dedent = require('dedent-js')
const paneTitleClass="panel-header"
const paneChildClass="panel"

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
            console.log(`Panel ${this.props.data.identifier} is open, closing.`)
            this.setState({open: false})
        } else {
            console.log(`Panel ${this.props.data.identifier} is closed, opening.`)
            this.setState({open: true})
        }
    }
    render() {
        const data = this.props.data
        if (data.hasChildPanes){
            console.log(`Panel ${this.props.data.identifier} has child panes.`)
            // The hasChildPanes option is used to note that the pane has subpanes
            data.children.map(
                // in that case, PaneParents are recursively created for each
                // subPanel
                (childPane) => {
                    console.log(`Calling for creation of child pane ${childPane.identifier}`)
                    return (
                        <PaneParent
                            identifier={childPane.identifier}
                            title={childPane.title}
                            children={childPane.children}
                        />
                    )
                }
            );
        }else {
            console.log(dedent `
                Calling for render of Pane for:
                    ID/Key: ${data.identifier}
                    Title: ${data.title}
                    Child (text): ${data.children}`)
            return (
                <Pane
                    identifier={data.identifier}
                    title={data.title}
                    onclick={this.flip}
                    children={data.children}
                />
            )
        }
    }
};

const getPaneParentId = (identifier) => `panel_wrapper_${identifier.replace(' ', '')}`
const getPaneTitleId = (identifier) => `panel_header_${identifier.replace(' ', '')}`
const getPaneChildId = (identifier) => `panel_${identifier.replace(' ', '')}`

const Pane = (props) => {
    console.log(dedent `
        Rendering Pane for:
            ID/Key: ${props.identifier}
            Title: ${props.title}`)
    return (
        <div id={getPaneParentId(props.identifier)}>
            <div
                    id={getPaneTitleId(props.identifier)}
                    className={paneTitleClass}
                    onClick={props.onClick}
                >{props.title}
            </div>
            <PaneText
                id={getPaneChildId(props.identifier)}
                className={paneChildClass}
                children={props.children}
            />
        </div>
    )
}

const PaneText = (props) => {
    if (props.open){
        return (
            <div id={props.id} className={props.className}>
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
            <div id="footer-title">Quick Links</div><br />
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
